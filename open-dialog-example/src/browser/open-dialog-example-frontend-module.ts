import { ContainerModule } from 'inversify';
import { CommandContribution } from '@theia/core';
import { OpenDialogExampleContribution } from './open-dialog-example-contribution';

// Bind the contribution so we can use it.
export default new ContainerModule(bind => {
    bind(CommandContribution).to(OpenDialogExampleContribution);
});