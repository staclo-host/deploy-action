const core = require('@actions/core');
const github = require('@actions/github');
const upload = require('./upload');

async function main() {
    try {
        const url = "https://api.staclo.host/publicApi/github/action/upload"
        let apiKey = core.getInput( 'api-key' );
        let folderName = core.getInput( 'folder-name' );
        const defaultFolder = "./";
        if ( folderName ) {
            console.log( `Folder to upload is: ${folderName}` );
        } else {
            console.log( `Folder to upload is not specified. See docs. Using default folder: ${defaultFolder}` );
        }
        const response = await upload( apiKey, folderName, defaultFolder, url ).then( res => {
            if ( res.status == 201 ) {
                console.log( `Successfully deployed!` );
                core.setOutput( "result", "Successfully deployed!" );
            } else {
                console.log( res.data );
                core.setFailed( "Failed with reason: " + res.data );
            }
        }).catch( err => {
            console.log( err.response.data );
            core.setFailed( "Failed with reason: " + err.response.data );
        });
    } catch ( error ) {
        console.log( error.message );
        core.setFailed( "An error occured: " + error.message );
    }
}

main();
