const axios = require( 'axios' );
const FormData = require( 'form-data' );
const fs = require( 'fs' );
const {promisify} = require( 'util' );
const JSZip = require( 'jszip' );
const zipper = require( 'zip-local' );
const {all} = require( "axios" );
const path = require( "path" );
const fileSaver = require('file-saver');

async function upload ( apiKey, folderName, defaultFolderName, url ) {
	const form = await buildForm( apiKey, folderName, defaultFolderName );
	const headers = await getFormHeaders(form);
	return axios.post(url, form, {headers: headers,maxContentLength: Infinity})
}

async function buildForm ( apiKey, folderName, defaultFolderName ) {
	const form = new FormData();
	form.append( "apiKey", apiKey );
	let folderToZip = defaultFolderName;
	if ( folderName ) {
		folderToZip = folderName;
	}
	var allPaths = [];
	try {
		const stat = fs.lstatSync( folderToZip );
		if ( stat.isDirectory() ) {
			allPaths.push( ...getFilePathsRecursiveSync( folderToZip ) )
		}
	} catch ( e ) {
		console.log( e )
		console.log( "Folder " + folderToZip + " does not exists!" )
		throw new Error( "Folder " + folderToZip + " does not exists!" );
	}
	let zip = new JSZip()
	for ( let filePath of allPaths ) {
		let addPath = path.relative(folderToZip, filePath);
		let data = fs.readFileSync( filePath )
		zip.file( addPath, data )
	}
	const content = await zip.generateAsync( {type: "blob"} );
	const buffer = Buffer.from( await content.arrayBuffer() );
	await writeFile( "zipToUpload.zip", buffer )
	form.append("file", fs.createReadStream("zipToUpload.zip"));
	return form
}

async function writeFile(filename, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filename, data, (e) => {
			if (e) {
				return reject(e);
			}
			resolve();
		});
	});
}

async function getFormHeaders ( form ) {
	const getLen = promisify( form.getLength ).bind( form );
	const len = await getLen();
	return {
		...form.getHeaders(), 'Content-Length': len
	}
}

function getFilePathsRecursiveSync ( dir ) {
	var results = []
	list = fs.readdirSync( dir )
	var pending = list.length
	if ( !pending ) {
		return results
	}
	for ( let file of list ) {
		file = path.resolve( dir, file )
		let stat = fs.statSync( file )
		if ( stat && stat.isDirectory() ) {
			res = getFilePathsRecursiveSync( file )
			results = results.concat( res )
		} else {
			results.push( file )
		}
		if ( !--pending ) {
			return results
		}
	}
	return results
}

module.exports = upload;
