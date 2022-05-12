import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AzurermProvider, ResourceGroup, VirtualNetwork } from "./.gen/providers/azurerm";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AzurermProvider(this, "AzureRm", {
      features: {},
    });

    const rg = new ResourceGroup(this, "cdktf-rg", {
      name: "rg2",
      location: "canadacentral",
    });

    new VirtualNetwork(this, "TfVnet", {
      location: rg.location,
      addressSpace: ["10.0.0.0/24"],
      name: "TerraformVNet",
      resourceGroupName: rg.name,
      dependsOn:[rg],
    });
  }
}

const app = new App();
new MyStack(app, "test");
app.synth();