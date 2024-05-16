import { FilteringQueryV2, PagedList } from "$entities/Query";
import {
  INTERNAL_SERVER_ERROR_SERVICE_RESPONSE,
  INVALID_ID_SERVICE_RESPONSE,
  ServiceResponse,
} from "$entities/Service";
import { TodoDTO } from "$entities/Todo";
import Logger from "$pkg/logger";
import { prisma } from "$utils/prisma.utils";
import { buildFilterQueryLimitOffsetV2 } from "./helpers/FilterQueryV2";

export async function getAll(
  filter: FilteringQueryV2
): Promise<ServiceResponse<{}>> {
  try {
    const data: PagedList<TodoDTO[]> = {
      entries: await prisma.todo.findMany(
        buildFilterQueryLimitOffsetV2(filter)
      ),
      totalData: await prisma.todo.count(),
      totalPage: Math.ceil(
        (await prisma.todo.count({
          where: filter.filters,
        })) / (filter.rows ?? 1)
      ),
    };

    return {
      status: true,
      data: data,
    };
  } catch (err) {
    Logger.error(`TodoService.get : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

export async function create(todo: TodoDTO): Promise<ServiceResponse<{}>> {
  try {
    await prisma.todo.create({ data: todo });
    return {
      status: true,
    };
  } catch (err) {
    Logger.error(`TodoService.create : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

export async function update(
  id: number,
  todo: TodoDTO
): Promise<ServiceResponse<{}>> {
  try {
    await prisma.todo.update({ where: { id }, data: todo });
    return {
      status: true,
    };
  } catch (err) {
    Logger.error(`TodoService.update : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

export async function remove(id: number): Promise<ServiceResponse<{}>> {
  try {
    await prisma.todo.delete({ where: { id } });
    return {
      status: true,
    };
  } catch (err) {
    Logger.error(`TodoService.remove : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

export async function getById(id: number): Promise<ServiceResponse<{}>> {
  try {
    const data: TodoDTO = (await prisma.todo.findUnique({
      where: { id },
    })) as TodoDTO;
    if (!data) return INVALID_ID_SERVICE_RESPONSE;
    return {
      status: true,
      data: data,
    };
  } catch (err) {
    Logger.error(`TodoService.getById : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
