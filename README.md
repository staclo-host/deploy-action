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

Here is an example of how to use this action in your workflow. Select Actions in your project -> set up the workflow yourself and copy the code below.

```yaml
on: [push]

jobs:
  staclo_deploy:
    runs-on: ubuntu-latest
    name: A job upload to Staclo.host
    steps:
      # Checkout
      - name: checkout first
        uses: actions/checkout@v4.1.0
        # Run Staclo.host deploy action
      - name: staclo-deploy
        id: staclo-deploy
        uses: staclo-host/deploy-action@latest
        with:
          # Set the secret as an input
          # Using secrets instead of API key is recommended i.e. ${{ secrets.staclo-api-key }}
          api-key: 'api-key-example'
          # Set folder do deploy
          folder-name: './out'
      - name: Result
        # Print the result
        run: echo "The result of deploy is ${{ steps.staclo-deploy.outputs.result }}"

```

We highly recommend using secret in github so you don't disclose your api key. See  [docs](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
