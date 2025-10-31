# n8n-nodes-dikda

n8n community node for searching the [Dikda digital archive](https://dikda.snk.sk) - Slovak National Library's digital archive.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Search

Search the Dikda digital archive with support for:
- **Query Types**: Simple, Edismax (Extended DisMax), or Match All
- **Model Filtering**: Filter by document types (periodical, monograph, article, graphic, map, manuscript, collection, sheet music, etc.)
- **Faceting**: Enable faceting on various fields (keywords, languages, licenses, authors, publishers, etc.)
- **Grouping**: Group results by field (e.g., root.pid)
- **Boost Queries**: Apply boost queries to prioritize certain document types
- **Pagination**: Return all results or limit the number of results
- **Sorting**: Sort results by score, date, or other fields
- **Field Selection**: Choose which fields to return in results

### Get by PID

Retrieve a specific document by its Persistent Identifier (PID/UUID):
- Enter the PID/UUID (with or without "uuid:" prefix)
- Configure which fields to return (optional)
- Returns detailed information about the document

## Credentials

No credentials required. The Dikda API is publicly accessible.

## Compatibility

- Minimum n8n version: 1.0.0
- Tested with n8n workflow version: 1.x

## Usage

### Search Operation

1. Add the Dikda node to your workflow
2. Select the **Search** operation
3. Choose your query type (Simple, Edismax, or Match All)
4. Enter your search query (if not using Match All)
5. Configure filters, faceting, grouping, and other options as needed
6. Execute the workflow

### Get by PID Operation

1. Add the Dikda node to your workflow
2. Select the **Get by PID** operation
3. Enter the document PID/UUID (e.g., `uuid:99a11ca9-9872-4f89-a682-432e6b54da53` or just `99a11ca9-9872-4f89-a682-432e6b54da53`)
4. Optionally configure fields to return (leave empty for all fields)
5. Execute the workflow

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Dikda digital archive](https://dikda.snk.sk)
* [Dikda API documentation](https://dikda.snk.sk/search/api/client/v7.0/)

## Version history

### 1.0.0
- Initial release
- Search operation with query types (Simple, Edismax, Match All)
- Get by PID operation for retrieving specific documents
- Model filtering
- Faceting support
- Grouping support
- Boost queries
- Pagination and sorting
