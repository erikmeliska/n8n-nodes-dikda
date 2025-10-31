import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGetByPid = {
	operation: ['getByPid'],
	resource: ['search'],
};

export const getByPidDescription: INodeProperties[] = [
	{
		displayName: 'PID (UUID)',
		name: 'pid',
		type: 'string',
		displayOptions: {
			show: showOnlyForGetByPid,
		},
		default: '',
		required: true,
		description: 'The Persistent Identifier (PID/UUID) of the document to retrieve (e.g., uuid:99a11ca9-9872-4f89-a682-432e6b54da53)',
		placeholder: 'uuid:99a11ca9-9872-4f89-a682-432e6b54da53',
		routing: {
			send: {
				type: 'query',
				property: 'q',
				value: '={{ $value.startsWith("uuid:") ? `pid:"${$value}"` : `pid:"uuid:${$value}"` }}',
			},
		},
	},
	{
		displayName: 'Rows',
		name: 'rows',
		type: 'number',
		displayOptions: {
			show: showOnlyForGetByPid,
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 1,
		description: 'Number of results to return (typically 1 for PID lookup)',
		routing: {
			send: {
				type: 'query',
				property: 'rows',
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		displayOptions: {
			show: showOnlyForGetByPid,
		},
		default: '',
		description: 'Comma-separated list of fields to return (leave empty for all fields)',
		routing: {
			send: {
				type: 'query',
				property: 'fl',
			},
		},
	},
];

