/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from 'config/ApiError'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export const errorHandler = (
  error: FastifyError | ZodError | ApiError | Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      issues: error.issues
    })
  } else if (error instanceof ApiError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.statusMessage,
      message: error.message
    })
  } else {
    reply.status(500).send(error)
  }
}

export const asyncErrorHandler =
  <T extends { Body: any }>(handler: (request: FastifyRequest<T>, reply: FastifyReply) => Promise<void>) =>
  async (request: FastifyRequest<T>, reply: FastifyReply) => {
    try {
      await handler(request, reply)
    } catch (error: any) {
      errorHandler(error, request, reply)
    }
  }
