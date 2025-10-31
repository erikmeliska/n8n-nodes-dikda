import type { INodeProperties } from 'n8n-workflow';
import { searchDescription } from './search';

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
		],
		default: 'search',
	},
	...searchDescription,
];

