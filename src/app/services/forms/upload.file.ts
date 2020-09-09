export function uploadFilePiker(event: any): { file: File, reader: FileReader } {
    const file = (event.target as HTMLInputElement).files[0]

    const reader = new FileReader()

    return {
        file: file,
        reader: reader
    }
}