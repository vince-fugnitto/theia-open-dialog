import { inject, injectable } from 'inversify';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { FileDialogService, OpenFileDialogProps } from '@theia/filesystem/lib/browser';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';

@injectable()
export class OpenDialogExampleContribution implements CommandContribution {

    // Inject the file dialog service so we can trigger the `Open Dialog`.
    @inject(FileDialogService)
    protected readonly fileDialogService!: FileDialogService;

    // Inject the workspace service so we can obtain the workspace root.
    @inject(WorkspaceService)
    protected readonly workspaceService!: WorkspaceService;

    // Define a new command so we can trigger it.
    protected open: Command = {
        id: 'open-dialog-example',
        label: 'Open Dialog Example'
    };

    // Register the open dialog command, which executes our `openDialog()` method.
    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(this.open, {
            isEnabled: () => true,
            isVisible: () => true,
            execute: () => this.openDialog()
        });
    }

    protected openDialog() {
        // The open dialog customizable properties.
        const props: OpenFileDialogProps = {
            title: 'Open Dialog Example',
            canSelectFolders: true,
            canSelectFiles: false,
        };
        // Get the first workspace root.
        const root = this.workspaceService.tryGetRoots()[0];
        // Open the `Open Dialog` with the given properties, and with respect to the given root.
        this.fileDialogService.showOpenDialog(props, root);
    }
}