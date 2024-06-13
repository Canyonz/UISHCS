import { $api } from '@/shared/api/api';
import { Counter } from '../types/counter';

type CounterResponseNotArea = Omit<Counter, 'area'>;

interface CounterResponse extends CounterResponseNotArea {
  area: { id: string };
}

interface GetCountersResponse {
  count: number;
  results: CounterResponse[];
}

interface CountersArea {
  id: string;
  house: { address: string };
  str_number_full: string;
}

interface GetCountersProps {
  limit: number;
  offset: number;
}

export const getCounters = async ({ limit, offset }: GetCountersProps) => {
  try {
    const response = await $api.get<GetCountersResponse>('/meters/', {
      params: {
        limit: limit,
        offset: offset,
      },
    });

    const areaPromises = response.data.results.map(async (data) => ({
      ...data,
      area: await $api
        .get<CountersArea>(`/areas/${data.area.id}`)
        .then(
          (response) =>
            response.data.house.address + response.data.str_number_full
        ),
    }));
    const data = await Promise.all(areaPromises);

    return { count: response.data.count, results: data };
  } catch (error) {
    console.log(error);
  }
};

interface DeleteCountersProps {
  id: string;
}

export const deleteCounter = async ({ id }: DeleteCountersProps) => {
  try {
    const response = await $api.delete<{ id: string }>(`/meters/${id}/`);

    return response;
  } catch (error) {
    console.log(error);
  }
};
