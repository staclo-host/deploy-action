# GitHub Action for Deploying to Staclo.host

This GitHub Action allows you to deploy your site directly to [Staclo.host](https://staclo.host) from your repository.

## Documentation

For full documentation, please visit [Staclo.host Docs](https://staclo.host/docs/home).

## How to get Staclo hosting?
Sign up at  [Staclo.host](https://staclo.host) and create a new page in the admin dashboard by clicking on "Create a github page" button or copy the api key from an existing page.


## Parameters

| Parameter | Description                  |
|-----------|------------------------------|
| `api-key`  | Page api key from Staclo.host  |
| `folder-name`  | Path to deploy. Default is "./". Typically ./out or anything with static content you want to deploy.  |

## Example Usage

Here is an example of how to use this action in your workflow:

```yaml
name: Deploy to Staclo.host

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Deploy to Staclo Host
        uses: your-username/your-repository@v1
        with:
          param1: value1
          param2: value2
          param3: value3
