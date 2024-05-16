import { Request, Response } from "express";
import * as TodoService from "$services/TodoService";
import {
  handleServiceErrorWithResponse,
  response_created,
  response_success,
} from "$utils/response.utils";
import { checkFilteringQueryV2 } from "$controllers/helpers/CheckFilteringQuery";

export async function getAll(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await TodoService.getAll(checkFilteringQueryV2(req));

  // Error handling if service response having an error :
  if (!serviceResponse.status)
    return handleServiceErrorWithResponse(res, serviceResponse);

  //Return success otherwise
  return response_success(res, serviceResponse.data, "Success!");
}

export async function create(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await TodoService.create(req.body);

  // Error handling if service response having an error :
  if (!serviceResponse.status)
    return handleServiceErrorWithResponse(res, serviceResponse);

  //Return success otherwise
  return response_created(res, {}, "Success!");
}

export async function update(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await TodoService.update(
    parseInt(req.params.id),
    req.body
  );

  // Error handling if service response having an error :
  if (!serviceResponse.status)
    return handleServiceErrorWithResponse(res, serviceResponse);

  //Return success otherwise
  return response_success(res, {}, "Success!");
}

export async function remove(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await TodoService.remove(parseInt(req.params.id));

  // Error handling if service response having an error :
  if (!serviceResponse.status)
    return handleServiceErrorWithResponse(res, serviceResponse);

  //Return success otherwise
  return response_success(res, {}, "Success!");
}

export async function getById(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await TodoService.getById(parseInt(req.params.id));

  // Error handling if service response having an error :
  if (!serviceResponse.status)
    return handleServiceErrorWithResponse(res, serviceResponse);

  //Return success otherwise
  return response_success(res, serviceResponse.data, "Success!");
}
