import type { INodeProperties } from 'n8n-workflow';
import { searchDescription } from './search';
import { getByPidDescription } from './getByPid';

const showOnlyForSearch = {
	resource: ['search'],
};

export const searchResourceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSearch,
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search documents',
				description: 'Search the Dikda digital archive',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
					},
				},
			},
			{
				name: 'Get by PID',
				value: 'getByPid',
				action: 'Get document by PID',
				description: 'Get a single document by its Persistent Identifier (PID/UUID)',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
					},
				},
			},
		],
		default: 'search',
	},
	...searchDescription,
	...getByPidDescription,
];

