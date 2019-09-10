
<p align="center">
    <img src="./docs/yalla.png" />
    <br>
    <br>
	<sup><strong>yalla f**cking yalla</strong></sup>
</p>

![node](https://img.shields.io/badge/node-v8.10.0-blue.svg) 
![yarn](https://img.shields.io/badge/yarn-v1.7.0-yellow.svg) 

# yalla 🏃


Interactive Connector Deployment Tool
* 🎉 **Self updating** - no more inconsistent deploys
* 🧬 **Safe parallel deploys** - everything is in memory and via k8s apis
* 🔒 **Input validation** - no more connector-connector-tsb
* 🔥 **Per environment deploys** - using k8s Kustomize
* 💪 **Support batch deploying all connectors** - for sweeping updates

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Owner](#owner)

## Installation

You'll need an install of `nodejs` with a version of `npm` greater than or equal to `v5.2.0`. 

Then all that's left is to add an alias to whatever initialization file you use for configuring your shell (i.e. `.bashrc`)

```bash
# .bashrc / .profile / .bash_aliases / etc.

alias yalla="npx --ignore-existing yalla"
```

## Usage

yalla is an interactive cli so no need for flags or commands.

```bash
$ yalla
...
```

## Examples

```
$ yalla

===========================================================================
]|[                                                                     ]|[
]|[                         yalla f**cking yalla                        ]|[
]|[                                                                     ]|[
===========================================================================

✔ Connected to cluster

? Choose a connector: first-direct
? Choose a version: v8.0.14
? Detected tunnel to development cluster, is that correct?: Yes
? Proceed to deploy first-direct version v8.0.14 to development?: Yes

ℹ️  Deploying connector-first-direct version v8.0.14 to development

✔ Checking cluster for current deployment replicas
✔ Matching the 2 replicas currently deployed in cluster
✔ Generating deployment manifest for development using Kustomize
✔ Substituting connector specific values into kustomize manifest

ℹ️  Deleting hpa from connectivity namespace

✔ Deleting hpa connector-first-direct from connectivity namespace
✔ hpa connector-first-direct successfully deleted

ℹ️  Applying manifests to connectivity namespace

✔ Deployment connector-first-direct successfully rolled out
✔ Deployment successful 🎉

ℹ️  Redeploying hpa to connectivity namespace

✔ Deploying with basic hpa
✔ Recreating hpa connector-first-direct in connectivity namespace
✔ hpa connector-first-direct successfully created

ℹ️  Done

```

## Additional Information
* Yalla deletes the hpa during deployment, then re-creates it after the deployment in order to mitigate a bug in Kubernetes. If for whatever reason the deployment fails, run the generated `hpa.yml` file in order to re-create the deleted hpa. 
* The nationwide, coop and lloyds-business connectors do not support prometheus metrics, so are deployed with a simpler, cpu-based hpa.

## Owner

> **Connectivity**
