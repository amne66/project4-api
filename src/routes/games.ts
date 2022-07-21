import { Game } from '@prisma/client';
import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import { prismaClient } from '../prisma';

const Game = Type.Object({
	name: Type.String(),
	attempts: Type.String(),
	mistakes: Type.String(),
	completion: Type.String(),
	total_time: Type.String(),
});

export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/games',
		schema: {
			summary: 'Insert game',
			tags: ['Games'],
			body: Game,
		},
		handler: async (request, reply) => {
			const game = request.body as Game;
			return await prismaClient.game.create({
			data: game,
			});
		},
	});

	/// Get all contacts or search by name
	server.route({
		method: 'GET',
		url: '/games',
		schema: {
			summary: 'Gets all Games',
			tags: ['Games'],

			response: {
				'2xx': Type.Array(Game),
			},
		},
		handler: async (request, reply) => {
			return await prismaClient.game.findMany();
		},
	});
}