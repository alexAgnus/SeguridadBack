

export interface FileUpload{
    name: string;
    data: any;
    encoding: string;
    size: string;
    tempFilePa:string;
    truncated:boolean;
    mimetype: string;
    
    mv: Function;
}