const conf = {
    endPointUrl: String(import.meta.env.VITE_ENDURL),
    projectId: String(import.meta.env.VITE_PROJECTID),
    databaseId: String(import.meta.env.VITE_DATABASEID),
    collectionId: String(import.meta.env.VITE_COLLECTIONID),
    bucketId: String(import.meta.env.VITE_BUCKETID),
    tinyApiKey: String(import.meta.env.VITE_TINYAPIKEY)
};

export default conf;