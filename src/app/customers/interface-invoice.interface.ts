export interface InterfaceInvoice {
    id?: number,
    data: string,
    numero: number,
    anno: number,
    importo: number,
    stato: string,
    cliente: IClient,
    dataInserimento: string,
    dataUltimaModifica: string
}

export interface IClient {
    id?: number,
    ragioneSociale: string,
    partitaIva: string,
    tipoCliente: string,
    email: string,
    pec: string,
    telefono: string,
    nomeContatto: string,
    cognomeContatto: string,
    telefonoContatto: string,
    emailContatto: string,
    indirizzoSede: indirizzoSede,
    dataInserimento: string
}

export interface indirizzoSede {
    via: string,
    civico: string,
    cap: string,
    comune: IComune
}

export interface IComune {
    nome: string,
    provincia: string
}
