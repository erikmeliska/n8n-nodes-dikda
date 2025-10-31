import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { searchResourceDescription } from './resources/search';

export class Dikda implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dikda',
		name: 'dikda',
		icon: { light: 'file:dikda.svg', dark: 'file:dikda.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Search the Dikda digital archive (Slovak National Library digital archive)',
		defaults: {
			name: 'Dikda',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [],
		requestDefaults: {
			baseURL: 'https://dikda.snk.sk/search/api/client/v7.0/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Search',
						value: 'search',
					},
				],
				default: 'search',
			},
			...searchResourceDescription,
		],
	};
}
