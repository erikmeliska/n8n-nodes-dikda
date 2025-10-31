import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSearch = {
	operation: ['search'],
	resource: ['search'],
};

export const searchDescription: INodeProperties[] = [
	{
		displayName: 'Query Type',
		name: 'queryType',
		type: 'options',
		displayOptions: {
			show: showOnlyForSearch,
		},
		options: [
			{
				name: 'Simple',
				value: 'simple',
				description: 'Simple query string',
			},
			{
				name: 'Edismax',
				value: 'edismax',
				description: 'Extended DisMax query parser',
			},
			{
				name: 'Match All',
				value: 'matchAll',
				description: 'Match all documents (*:*)',
			},
		],
		default: 'simple',
		description: 'Type of query to execute',
	},
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				queryType: ['simple', 'edismax'],
			},
		},
		default: '',
		required: true,
		description: 'The search query string',
		routing: {
			send: {
				type: 'query',
				property: 'q',
				value: '={{ $parameter.queryType === "matchAll" ? "*:*" : $parameter.query }}',
			},
		},
	},
	{
		displayName: 'Query Parser Type',
		name: 'defType',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				queryType: ['edismax'],
			},
		},
		default: 'edismax',
		description: 'Query parser type (edismax)',
		routing: {
			send: {
				type: 'query',
				property: 'defType',
			},
		},
	},
	{
		displayName: 'Query Fields',
		name: 'queryFields',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				queryType: ['edismax'],
			},
		},
		default: 'title.search',
		description: 'Query fields for Edismax (e.g., title.search^10 authors.search^2)',
		routing: {
			send: {
				type: 'query',
				property: 'qf',
			},
		},
	},
	{
		displayName: 'Models',
		name: 'models',
		type: 'multiOptions',
		displayOptions: {
			show: showOnlyForSearch,
		},
		options: [
			{
				name: 'Article',
				value: 'article',
			},
			{
				name: 'Collection',
				value: 'collection',
			},
			{
				name: 'Graphic',
				value: 'graphic',
			},
			{
				name: 'Internal Part',
				value: 'internalpart',
			},
			{
				name: 'Manuscript',
				value: 'manuscript',
			},
			{
				name: 'Map',
				value: 'map',
			},
			{
				name: 'Monograph',
				value: 'monograph',
			},
			{
				name: 'Monograph Unit',
				value: 'monographunit',
			},
			{
				name: 'Page',
				value: 'page',
			},
			{
				name: 'Periodical',
				value: 'periodical',
			},
			{
				name: 'Sheet Music',
				value: 'sheetmusic',
			},
		],
		default: [
			'periodical',
			'monograph',
			'article',
			'graphic',
			'map',
			'manuscript',
			'collection',
			'sheetmusic',
			'monographunit',
			'internalpart',
			'page',
		],
		description: 'Filter by document models',
		routing: {
			send: {
				type: 'query',
				property: 'fq',
				value: '={{ $value.map(v => `model:${v}`).join(" OR ") }}',
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForSearch,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
			},
			operations: {
				pagination: {
					type: 'offset',
					properties: {
						limitParameter: 'rows',
						offsetParameter: 'start',
						pageSize: 50,
						type: 'query',
					},
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'rows',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: {
			show: showOnlyForSearch,
		},
		default: 'score desc',
		description: 'Sort order (e.g., "score desc", "created desc")',
		routing: {
			send: {
				type: 'query',
				property: 'sort',
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		displayOptions: {
			show: showOnlyForSearch,
		},
		default: 'pid,accessibility,model,authors,title.search,root.title,date.str,score',
		description: 'Comma-separated list of fields to return',
		routing: {
			send: {
				type: 'query',
				property: 'fl',
			},
		},
	},
	{
		displayName: 'Enable Faceting',
		name: 'enableFaceting',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForSearch,
		},
		default: false,
		description: 'Whether to enable faceting',
		routing: {
			send: {
				type: 'query',
				property: 'facet',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Facet Fields',
		name: 'facetFields',
		type: 'multiOptions',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				enableFaceting: [true],
			},
		},
		options: [
			{
				name: 'Authors',
				value: 'authors.facet',
			},
			{
				name: 'Contains Licenses',
				value: 'contains_licenses',
			},
			{
				name: 'Genres',
				value: 'genres.facet',
			},
			{
				name: 'Geographic Names',
				value: 'geographic_names.facet',
			},
			{
				name: 'Keywords',
				value: 'keywords.facet',
			},
			{
				name: 'Languages',
				value: 'languages.facet',
			},
			{
				name: 'Licenses',
				value: 'licenses',
			},
			{
				name: 'Licenses of Ancestors',
				value: 'licenses_of_ancestors',
			},
			{
				name: 'Own Model Path',
				value: 'own_model_path',
			},
			{
				name: 'Publication Places',
				value: 'publication_places.facet',
			},
			{
				name: 'Publishers',
				value: 'publishers.facet',
			},
		],
		default: ['own_model_path'],
		description: 'Fields to use for faceting',
		routing: {
			send: {
				type: 'query',
				property: 'facet.field',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Facet Min Count',
		name: 'facetMinCount',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				enableFaceting: [true],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 1,
		description: 'Minimum count for facet values',
		routing: {
			send: {
				type: 'query',
				property: 'facet.mincount',
			},
		},
	},
	{
		displayName: 'Enable Grouping',
		name: 'enableGrouping',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForSearch,
		},
		default: false,
		description: 'Whether to enable grouping',
		routing: {
			send: {
				type: 'query',
				property: 'group',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Group Field',
		name: 'groupField',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				enableGrouping: [true],
			},
		},
		default: 'root.pid',
		description: 'Field to group by',
		routing: {
			send: {
				type: 'query',
				property: 'group.field',
			},
		},
	},
	{
		displayName: 'Group Sort',
		name: 'groupSort',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				enableGrouping: [true],
			},
		},
		default: 'score desc',
		description: 'Sort order for groups',
		routing: {
			send: {
				type: 'query',
				property: 'group.sort',
			},
		},
	},
	{
		displayName: 'Group Number of Groups',
		name: 'groupNgroups',
		type: 'boolean',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				enableGrouping: [true],
			},
		},
		default: true,
		description: 'Whether to return number of groups',
		routing: {
			send: {
				type: 'query',
				property: 'group.ngroups',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Group Truncate',
		name: 'groupTruncate',
		type: 'boolean',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				enableGrouping: [true],
			},
		},
		default: true,
		description: 'Whether to truncate groups',
		routing: {
			send: {
				type: 'query',
				property: 'group.truncate',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Boost Queries',
		name: 'boostQueries',
		type: 'collection',
		displayOptions: {
			show: showOnlyForSearch,
		},
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		description: 'Boost queries to apply',
		placeholder: 'Add Boost Query',
		options: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Boost query (e.g., model:monograph^5)',
			},
		],
		routing: {
			send: {
				type: 'query',
				property: 'bq',
				value: '={{ $value.map(item => item.query).filter(q => q) }}',
			},
		},
	},
];

