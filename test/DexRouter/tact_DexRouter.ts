import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferForwardPayload = {
    $$type: 'JettonTransferForwardPayload';
    is_right: boolean;
    value: Slice;
}

export function storeJettonTransferForwardPayload(src: JettonTransferForwardPayload) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_right);
        b_0.storeBuilder(src.value.asBuilder());
    };
}

export function loadJettonTransferForwardPayload(slice: Slice) {
    let sc_0 = slice;
    let _is_right = sc_0.loadBit();
    let _value = sc_0;
    return { $$type: 'JettonTransferForwardPayload' as const, is_right: _is_right, value: _value };
}

function loadTupleJettonTransferForwardPayload(source: TupleReader) {
    let _is_right = source.readBoolean();
    let _value = source.readCell().asSlice();
    return { $$type: 'JettonTransferForwardPayload' as const, is_right: _is_right, value: _value };
}

function storeTupleJettonTransferForwardPayload(source: JettonTransferForwardPayload) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_right);
    builder.writeSlice(source.value.asCell());
    return builder.build();
}

function dictValueParserJettonTransferForwardPayload(): DictionaryValue<JettonTransferForwardPayload> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferForwardPayload(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferForwardPayload(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: JettonTransferForwardPayload;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.store(storeJettonTransferForwardPayload(src.forward_payload));
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = loadJettonTransferForwardPayload(sc_0);
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    const _forward_payload = loadTupleJettonTransferForwardPayload(source.readTuple());
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeTuple(storeTupleJettonTransferForwardPayload(source.forward_payload));
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0;
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address.asCell());
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type SwapInfo = {
    $$type: 'SwapInfo';
    tokenA: Address;
    amount: bigint;
}

export function storeSwapInfo(src: SwapInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.tokenA);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadSwapInfo(slice: Slice) {
    let sc_0 = slice;
    let _tokenA = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'SwapInfo' as const, tokenA: _tokenA, amount: _amount };
}

function loadTupleSwapInfo(source: TupleReader) {
    let _tokenA = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'SwapInfo' as const, tokenA: _tokenA, amount: _amount };
}

function storeTupleSwapInfo(source: SwapInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tokenA);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSwapInfo(): DictionaryValue<SwapInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapInfo(src)).endCell());
        },
        parse: (src) => {
            return loadSwapInfo(src.loadRef().beginParse());
        }
    }
}

export type SwapJettonInStonfi = {
    $$type: 'SwapJettonInStonfi';
    op: bigint;
    transfer_jetton_fee: bigint;
    tokenB: Address;
    minReturn: bigint;
    recipient_addr: Address;
    referral_addr: Address | null;
    additional_info: Slice | null;
    invalidQuery: Slice;
}

export function storeSwapJettonInStonfi(src: SwapJettonInStonfi) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.op, 32);
        b_0.storeUint(src.transfer_jetton_fee, 32);
        b_0.storeAddress(src.tokenB);
        b_0.storeCoins(src.minReturn);
        b_0.storeAddress(src.recipient_addr);
        b_0.storeAddress(src.referral_addr);
        if (src.additional_info !== null && src.additional_info !== undefined) { b_0.storeBit(true).storeRef(src.additional_info.asCell()); } else { b_0.storeBit(false); }
        b_0.storeBuilder(src.invalidQuery.asBuilder());
    };
}

export function loadSwapJettonInStonfi(slice: Slice) {
    let sc_0 = slice;
    let _op = sc_0.loadUintBig(32);
    let _transfer_jetton_fee = sc_0.loadUintBig(32);
    let _tokenB = sc_0.loadAddress();
    let _minReturn = sc_0.loadCoins();
    let _recipient_addr = sc_0.loadAddress();
    let _referral_addr = sc_0.loadMaybeAddress();
    let _additional_info = sc_0.loadBit() ? sc_0.loadRef()?.asSlice() ?? null : null;
    let _invalidQuery = sc_0;
    return { $$type: 'SwapJettonInStonfi' as const, op: _op, transfer_jetton_fee: _transfer_jetton_fee, tokenB: _tokenB, minReturn: _minReturn, recipient_addr: _recipient_addr, referral_addr: _referral_addr, additional_info: _additional_info, invalidQuery: _invalidQuery };
}

function loadTupleSwapJettonInStonfi(source: TupleReader) {
    let _op = source.readBigNumber();
    let _transfer_jetton_fee = source.readBigNumber();
    let _tokenB = source.readAddress();
    let _minReturn = source.readBigNumber();
    let _recipient_addr = source.readAddress();
    let _referral_addr = source.readAddressOpt();
    let _additional_info = source.readCellOpt()?.asSlice() ?? null;
    let _invalidQuery = source.readCell().asSlice();
    return { $$type: 'SwapJettonInStonfi' as const, op: _op, transfer_jetton_fee: _transfer_jetton_fee, tokenB: _tokenB, minReturn: _minReturn, recipient_addr: _recipient_addr, referral_addr: _referral_addr, additional_info: _additional_info, invalidQuery: _invalidQuery };
}

function storeTupleSwapJettonInStonfi(source: SwapJettonInStonfi) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeNumber(source.transfer_jetton_fee);
    builder.writeAddress(source.tokenB);
    builder.writeNumber(source.minReturn);
    builder.writeAddress(source.recipient_addr);
    builder.writeAddress(source.referral_addr);
    builder.writeSlice(source.additional_info?.asCell());
    builder.writeSlice(source.invalidQuery.asCell());
    return builder.build();
}

function dictValueParserSwapJettonInStonfi(): DictionaryValue<SwapJettonInStonfi> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapJettonInStonfi(src)).endCell());
        },
        parse: (src) => {
            return loadSwapJettonInStonfi(src.loadRef().beginParse());
        }
    }
}

export type DedustSuccessInfo = {
    $$type: 'DedustSuccessInfo';
    op: bigint;
    query_id: bigint;
    user: Address;
}

export function storeDedustSuccessInfo(src: DedustSuccessInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.op, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.user);
    };
}

export function loadDedustSuccessInfo(slice: Slice) {
    let sc_0 = slice;
    let _op = sc_0.loadUintBig(32);
    let _query_id = sc_0.loadUintBig(64);
    let _user = sc_0.loadAddress();
    return { $$type: 'DedustSuccessInfo' as const, op: _op, query_id: _query_id, user: _user };
}

function loadTupleDedustSuccessInfo(source: TupleReader) {
    let _op = source.readBigNumber();
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'DedustSuccessInfo' as const, op: _op, query_id: _query_id, user: _user };
}

function storeTupleDedustSuccessInfo(source: DedustSuccessInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.user);
    return builder.build();
}

function dictValueParserDedustSuccessInfo(): DictionaryValue<DedustSuccessInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDedustSuccessInfo(src)).endCell());
        },
        parse: (src) => {
            return loadDedustSuccessInfo(src.loadRef().beginParse());
        }
    }
}

export type DedustFailInfo = {
    $$type: 'DedustFailInfo';
    op: bigint;
    query_id: bigint;
    user: Address;
    tokenA: Address;
}

export function storeDedustFailInfo(src: DedustFailInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.op, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.tokenA);
    };
}

export function loadDedustFailInfo(slice: Slice) {
    let sc_0 = slice;
    let _op = sc_0.loadUintBig(32);
    let _query_id = sc_0.loadUintBig(64);
    let _user = sc_0.loadAddress();
    let _tokenA = sc_0.loadAddress();
    return { $$type: 'DedustFailInfo' as const, op: _op, query_id: _query_id, user: _user, tokenA: _tokenA };
}

function loadTupleDedustFailInfo(source: TupleReader) {
    let _op = source.readBigNumber();
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    let _tokenA = source.readAddress();
    return { $$type: 'DedustFailInfo' as const, op: _op, query_id: _query_id, user: _user, tokenA: _tokenA };
}

function storeTupleDedustFailInfo(source: DedustFailInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.user);
    builder.writeAddress(source.tokenA);
    return builder.build();
}

function dictValueParserDedustFailInfo(): DictionaryValue<DedustFailInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDedustFailInfo(src)).endCell());
        },
        parse: (src) => {
            return loadDedustFailInfo(src.loadRef().beginParse());
        }
    }
}

export type DedustJettonSwapInfo = {
    $$type: 'DedustJettonSwapInfo';
    op: bigint;
    pool: Address;
    kind: boolean;
    minReturn: bigint;
    next: Cell | null;
    swapParams: Cell;
}

export function storeDedustJettonSwapInfo(src: DedustJettonSwapInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.op, 32);
        b_0.storeAddress(src.pool);
        b_0.storeBit(src.kind);
        b_0.storeCoins(src.minReturn);
        if (src.next !== null && src.next !== undefined) { b_0.storeBit(true).storeRef(src.next); } else { b_0.storeBit(false); }
        b_0.storeRef(src.swapParams);
    };
}

export function loadDedustJettonSwapInfo(slice: Slice) {
    let sc_0 = slice;
    let _op = sc_0.loadUintBig(32);
    let _pool = sc_0.loadAddress();
    let _kind = sc_0.loadBit();
    let _minReturn = sc_0.loadCoins();
    let _next = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _swapParams = sc_0.loadRef();
    return { $$type: 'DedustJettonSwapInfo' as const, op: _op, pool: _pool, kind: _kind, minReturn: _minReturn, next: _next, swapParams: _swapParams };
}

function loadTupleDedustJettonSwapInfo(source: TupleReader) {
    let _op = source.readBigNumber();
    let _pool = source.readAddress();
    let _kind = source.readBoolean();
    let _minReturn = source.readBigNumber();
    let _next = source.readCellOpt();
    let _swapParams = source.readCell();
    return { $$type: 'DedustJettonSwapInfo' as const, op: _op, pool: _pool, kind: _kind, minReturn: _minReturn, next: _next, swapParams: _swapParams };
}

function storeTupleDedustJettonSwapInfo(source: DedustJettonSwapInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeAddress(source.pool);
    builder.writeBoolean(source.kind);
    builder.writeNumber(source.minReturn);
    builder.writeCell(source.next);
    builder.writeCell(source.swapParams);
    return builder.build();
}

function dictValueParserDedustJettonSwapInfo(): DictionaryValue<DedustJettonSwapInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDedustJettonSwapInfo(src)).endCell());
        },
        parse: (src) => {
            return loadDedustJettonSwapInfo(src.loadRef().beginParse());
        }
    }
}

export type DedustNativeSwapInfo = {
    $$type: 'DedustNativeSwapInfo';
    op: bigint;
    query_id: bigint;
    amount: bigint;
    pool: Address;
    kind: boolean;
    minReturn: bigint;
    next: Cell | null;
    swapParams: Cell;
}

export function storeDedustNativeSwapInfo(src: DedustNativeSwapInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.op, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.pool);
        b_0.storeBit(src.kind);
        b_0.storeCoins(src.minReturn);
        if (src.next !== null && src.next !== undefined) { b_0.storeBit(true).storeRef(src.next); } else { b_0.storeBit(false); }
        b_0.storeRef(src.swapParams);
    };
}

export function loadDedustNativeSwapInfo(slice: Slice) {
    let sc_0 = slice;
    let _op = sc_0.loadUintBig(32);
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _pool = sc_0.loadAddress();
    let _kind = sc_0.loadBit();
    let _minReturn = sc_0.loadCoins();
    let _next = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _swapParams = sc_0.loadRef();
    return { $$type: 'DedustNativeSwapInfo' as const, op: _op, query_id: _query_id, amount: _amount, pool: _pool, kind: _kind, minReturn: _minReturn, next: _next, swapParams: _swapParams };
}

function loadTupleDedustNativeSwapInfo(source: TupleReader) {
    let _op = source.readBigNumber();
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _pool = source.readAddress();
    let _kind = source.readBoolean();
    let _minReturn = source.readBigNumber();
    let _next = source.readCellOpt();
    let _swapParams = source.readCell();
    return { $$type: 'DedustNativeSwapInfo' as const, op: _op, query_id: _query_id, amount: _amount, pool: _pool, kind: _kind, minReturn: _minReturn, next: _next, swapParams: _swapParams };
}

function storeTupleDedustNativeSwapInfo(source: DedustNativeSwapInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.pool);
    builder.writeBoolean(source.kind);
    builder.writeNumber(source.minReturn);
    builder.writeCell(source.next);
    builder.writeCell(source.swapParams);
    return builder.build();
}

function dictValueParserDedustNativeSwapInfo(): DictionaryValue<DedustNativeSwapInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDedustNativeSwapInfo(src)).endCell());
        },
        parse: (src) => {
            return loadDedustNativeSwapInfo(src.loadRef().beginParse());
        }
    }
}

export type DedustSwapParams = {
    $$type: 'DedustSwapParams';
    deadline: bigint;
    recipient_addr: Address | null;
    referral_addr: Address | null;
    fufill_payload: Cell | null;
    reject_payload: Cell | null;
}

export function storeDedustSwapParams(src: DedustSwapParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.deadline, 32);
        b_0.storeAddress(src.recipient_addr);
        b_0.storeAddress(src.referral_addr);
        if (src.fufill_payload !== null && src.fufill_payload !== undefined) { b_0.storeBit(true).storeRef(src.fufill_payload); } else { b_0.storeBit(false); }
        if (src.reject_payload !== null && src.reject_payload !== undefined) { b_0.storeBit(true).storeRef(src.reject_payload); } else { b_0.storeBit(false); }
    };
}

export function loadDedustSwapParams(slice: Slice) {
    let sc_0 = slice;
    let _deadline = sc_0.loadUintBig(32);
    let _recipient_addr = sc_0.loadMaybeAddress();
    let _referral_addr = sc_0.loadMaybeAddress();
    let _fufill_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _reject_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'DedustSwapParams' as const, deadline: _deadline, recipient_addr: _recipient_addr, referral_addr: _referral_addr, fufill_payload: _fufill_payload, reject_payload: _reject_payload };
}

function loadTupleDedustSwapParams(source: TupleReader) {
    let _deadline = source.readBigNumber();
    let _recipient_addr = source.readAddressOpt();
    let _referral_addr = source.readAddressOpt();
    let _fufill_payload = source.readCellOpt();
    let _reject_payload = source.readCellOpt();
    return { $$type: 'DedustSwapParams' as const, deadline: _deadline, recipient_addr: _recipient_addr, referral_addr: _referral_addr, fufill_payload: _fufill_payload, reject_payload: _reject_payload };
}

function storeTupleDedustSwapParams(source: DedustSwapParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.deadline);
    builder.writeAddress(source.recipient_addr);
    builder.writeAddress(source.referral_addr);
    builder.writeCell(source.fufill_payload);
    builder.writeCell(source.reject_payload);
    return builder.build();
}

function dictValueParserDedustSwapParams(): DictionaryValue<DedustSwapParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDedustSwapParams(src)).endCell());
        },
        parse: (src) => {
            return loadDedustSwapParams(src.loadRef().beginParse());
        }
    }
}

export type SwapJettonInDedust = {
    $$type: 'SwapJettonInDedust';
    op: bigint;
    transfer_jetton_fee: bigint;
    vaultA: Address;
    pool: Address;
    minReturn: bigint;
    recipient_addr: Address | null;
    referral_addr: Address | null;
    next: Cell | null;
    additional_info: Slice | null;
    invalidQuery: Slice;
}

export function storeSwapJettonInDedust(src: SwapJettonInDedust) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.op, 32);
        b_0.storeUint(src.transfer_jetton_fee, 32);
        b_0.storeAddress(src.vaultA);
        b_0.storeAddress(src.pool);
        b_0.storeCoins(src.minReturn);
        b_0.storeAddress(src.recipient_addr);
        let b_1 = new Builder();
        b_1.storeAddress(src.referral_addr);
        if (src.next !== null && src.next !== undefined) { b_1.storeBit(true).storeRef(src.next); } else { b_1.storeBit(false); }
        if (src.additional_info !== null && src.additional_info !== undefined) { b_1.storeBit(true).storeRef(src.additional_info.asCell()); } else { b_1.storeBit(false); }
        b_1.storeBuilder(src.invalidQuery.asBuilder());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwapJettonInDedust(slice: Slice) {
    let sc_0 = slice;
    let _op = sc_0.loadUintBig(32);
    let _transfer_jetton_fee = sc_0.loadUintBig(32);
    let _vaultA = sc_0.loadAddress();
    let _pool = sc_0.loadAddress();
    let _minReturn = sc_0.loadCoins();
    let _recipient_addr = sc_0.loadMaybeAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _referral_addr = sc_1.loadMaybeAddress();
    let _next = sc_1.loadBit() ? sc_1.loadRef() : null;
    let _additional_info = sc_1.loadBit() ? sc_1.loadRef()?.asSlice() ?? null : null;
    let _invalidQuery = sc_1;
    return { $$type: 'SwapJettonInDedust' as const, op: _op, transfer_jetton_fee: _transfer_jetton_fee, vaultA: _vaultA, pool: _pool, minReturn: _minReturn, recipient_addr: _recipient_addr, referral_addr: _referral_addr, next: _next, additional_info: _additional_info, invalidQuery: _invalidQuery };
}

function loadTupleSwapJettonInDedust(source: TupleReader) {
    let _op = source.readBigNumber();
    let _transfer_jetton_fee = source.readBigNumber();
    let _vaultA = source.readAddress();
    let _pool = source.readAddress();
    let _minReturn = source.readBigNumber();
    let _recipient_addr = source.readAddressOpt();
    let _referral_addr = source.readAddressOpt();
    let _next = source.readCellOpt();
    let _additional_info = source.readCellOpt()?.asSlice() ?? null;
    let _invalidQuery = source.readCell().asSlice();
    return { $$type: 'SwapJettonInDedust' as const, op: _op, transfer_jetton_fee: _transfer_jetton_fee, vaultA: _vaultA, pool: _pool, minReturn: _minReturn, recipient_addr: _recipient_addr, referral_addr: _referral_addr, next: _next, additional_info: _additional_info, invalidQuery: _invalidQuery };
}

function storeTupleSwapJettonInDedust(source: SwapJettonInDedust) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeNumber(source.transfer_jetton_fee);
    builder.writeAddress(source.vaultA);
    builder.writeAddress(source.pool);
    builder.writeNumber(source.minReturn);
    builder.writeAddress(source.recipient_addr);
    builder.writeAddress(source.referral_addr);
    builder.writeCell(source.next);
    builder.writeSlice(source.additional_info?.asCell());
    builder.writeSlice(source.invalidQuery.asCell());
    return builder.build();
}

function dictValueParserSwapJettonInDedust(): DictionaryValue<SwapJettonInDedust> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapJettonInDedust(src)).endCell());
        },
        parse: (src) => {
            return loadSwapJettonInDedust(src.loadRef().beginParse());
        }
    }
}

export type DedustPayOut = {
    $$type: 'DedustPayOut';
    query_id: bigint;
    payload: Slice | null;
}

export function storeDedustPayOut(src: DedustPayOut) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1196394191, 32);
        b_0.storeUint(src.query_id, 64);
        if (src.payload !== null && src.payload !== undefined) { b_0.storeBit(true).storeRef(src.payload.asCell()); } else { b_0.storeBit(false); }
    };
}

export function loadDedustPayOut(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1196394191) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _payload = sc_0.loadBit() ? sc_0.loadRef()?.asSlice() ?? null : null;
    return { $$type: 'DedustPayOut' as const, query_id: _query_id, payload: _payload };
}

function loadTupleDedustPayOut(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _payload = source.readCellOpt()?.asSlice() ?? null;
    return { $$type: 'DedustPayOut' as const, query_id: _query_id, payload: _payload };
}

function storeTupleDedustPayOut(source: DedustPayOut) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeSlice(source.payload?.asCell());
    return builder.build();
}

function dictValueParserDedustPayOut(): DictionaryValue<DedustPayOut> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDedustPayOut(src)).endCell());
        },
        parse: (src) => {
            return loadDedustPayOut(src.loadRef().beginParse());
        }
    }
}

export type SwapNativeInDedust = {
    $$type: 'SwapNativeInDedust';
    query_id: bigint;
    amount: bigint;
    pool: Address;
    minReturn: bigint;
    recipient_addr: Address | null;
    referral_addr: Address | null;
    next: Cell | null;
    additional_info: Slice | null;
    invalidQuery: Slice;
}

export function storeSwapNativeInDedust(src: SwapNativeInDedust) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3039744607, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.pool);
        b_0.storeCoins(src.minReturn);
        b_0.storeAddress(src.recipient_addr);
        let b_1 = new Builder();
        b_1.storeAddress(src.referral_addr);
        if (src.next !== null && src.next !== undefined) { b_1.storeBit(true).storeRef(src.next); } else { b_1.storeBit(false); }
        if (src.additional_info !== null && src.additional_info !== undefined) { b_1.storeBit(true).storeRef(src.additional_info.asCell()); } else { b_1.storeBit(false); }
        b_1.storeBuilder(src.invalidQuery.asBuilder());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwapNativeInDedust(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3039744607) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _pool = sc_0.loadAddress();
    let _minReturn = sc_0.loadCoins();
    let _recipient_addr = sc_0.loadMaybeAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _referral_addr = sc_1.loadMaybeAddress();
    let _next = sc_1.loadBit() ? sc_1.loadRef() : null;
    let _additional_info = sc_1.loadBit() ? sc_1.loadRef()?.asSlice() ?? null : null;
    let _invalidQuery = sc_1;
    return { $$type: 'SwapNativeInDedust' as const, query_id: _query_id, amount: _amount, pool: _pool, minReturn: _minReturn, recipient_addr: _recipient_addr, referral_addr: _referral_addr, next: _next, additional_info: _additional_info, invalidQuery: _invalidQuery };
}

function loadTupleSwapNativeInDedust(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _pool = source.readAddress();
    let _minReturn = source.readBigNumber();
    let _recipient_addr = source.readAddressOpt();
    let _referral_addr = source.readAddressOpt();
    let _next = source.readCellOpt();
    let _additional_info = source.readCellOpt()?.asSlice() ?? null;
    let _invalidQuery = source.readCell().asSlice();
    return { $$type: 'SwapNativeInDedust' as const, query_id: _query_id, amount: _amount, pool: _pool, minReturn: _minReturn, recipient_addr: _recipient_addr, referral_addr: _referral_addr, next: _next, additional_info: _additional_info, invalidQuery: _invalidQuery };
}

function storeTupleSwapNativeInDedust(source: SwapNativeInDedust) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.pool);
    builder.writeNumber(source.minReturn);
    builder.writeAddress(source.recipient_addr);
    builder.writeAddress(source.referral_addr);
    builder.writeCell(source.next);
    builder.writeSlice(source.additional_info?.asCell());
    builder.writeSlice(source.invalidQuery.asCell());
    return builder.build();
}

function dictValueParserSwapNativeInDedust(): DictionaryValue<SwapNativeInDedust> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapNativeInDedust(src)).endCell());
        },
        parse: (src) => {
            return loadSwapNativeInDedust(src.loadRef().beginParse());
        }
    }
}

export type ValidInfo = {
    $$type: 'ValidInfo';
    isValid: boolean;
    op: bigint;
    payload: Slice;
    transfer_jetton_fee: bigint;
}

export function storeValidInfo(src: ValidInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isValid);
        b_0.storeUint(src.op, 32);
        b_0.storeRef(src.payload.asCell());
        b_0.storeUint(src.transfer_jetton_fee, 32);
    };
}

export function loadValidInfo(slice: Slice) {
    let sc_0 = slice;
    let _isValid = sc_0.loadBit();
    let _op = sc_0.loadUintBig(32);
    let _payload = sc_0.loadRef().asSlice();
    let _transfer_jetton_fee = sc_0.loadUintBig(32);
    return { $$type: 'ValidInfo' as const, isValid: _isValid, op: _op, payload: _payload, transfer_jetton_fee: _transfer_jetton_fee };
}

function loadTupleValidInfo(source: TupleReader) {
    let _isValid = source.readBoolean();
    let _op = source.readBigNumber();
    let _payload = source.readCell().asSlice();
    let _transfer_jetton_fee = source.readBigNumber();
    return { $$type: 'ValidInfo' as const, isValid: _isValid, op: _op, payload: _payload, transfer_jetton_fee: _transfer_jetton_fee };
}

function storeTupleValidInfo(source: ValidInfo) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isValid);
    builder.writeNumber(source.op);
    builder.writeSlice(source.payload.asCell());
    builder.writeNumber(source.transfer_jetton_fee);
    return builder.build();
}

function dictValueParserValidInfo(): DictionaryValue<ValidInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeValidInfo(src)).endCell());
        },
        parse: (src) => {
            return loadValidInfo(src.loadRef().beginParse());
        }
    }
}

export type JettonPayload = {
    $$type: 'JettonPayload';
    isStonFi: boolean;
    payload: Slice;
}

export function storeJettonPayload(src: JettonPayload) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isStonFi);
        b_0.storeRef(src.payload.asCell());
    };
}

export function loadJettonPayload(slice: Slice) {
    let sc_0 = slice;
    let _isStonFi = sc_0.loadBit();
    let _payload = sc_0.loadRef().asSlice();
    return { $$type: 'JettonPayload' as const, isStonFi: _isStonFi, payload: _payload };
}

function loadTupleJettonPayload(source: TupleReader) {
    let _isStonFi = source.readBoolean();
    let _payload = source.readCell().asSlice();
    return { $$type: 'JettonPayload' as const, isStonFi: _isStonFi, payload: _payload };
}

function storeTupleJettonPayload(source: JettonPayload) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isStonFi);
    builder.writeSlice(source.payload.asCell());
    return builder.build();
}

function dictValueParserJettonPayload(): DictionaryValue<JettonPayload> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonPayload(src)).endCell());
        },
        parse: (src) => {
            return loadJettonPayload(src.loadRef().beginParse());
        }
    }
}

export type AdditionalInfo = {
    $$type: 'AdditionalInfo';
    additional_info: Slice | null;
}

export function storeAdditionalInfo(src: AdditionalInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.additional_info !== null && src.additional_info !== undefined) { b_0.storeBit(true).storeRef(src.additional_info.asCell()); } else { b_0.storeBit(false); }
    };
}

export function loadAdditionalInfo(slice: Slice) {
    let sc_0 = slice;
    let _additional_info = sc_0.loadBit() ? sc_0.loadRef()?.asSlice() ?? null : null;
    return { $$type: 'AdditionalInfo' as const, additional_info: _additional_info };
}

function loadTupleAdditionalInfo(source: TupleReader) {
    let _additional_info = source.readCellOpt()?.asSlice() ?? null;
    return { $$type: 'AdditionalInfo' as const, additional_info: _additional_info };
}

function storeTupleAdditionalInfo(source: AdditionalInfo) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.additional_info?.asCell());
    return builder.build();
}

function dictValueParserAdditionalInfo(): DictionaryValue<AdditionalInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAdditionalInfo(src)).endCell());
        },
        parse: (src) => {
            return loadAdditionalInfo(src.loadRef().beginParse());
        }
    }
}

export type SwapNativeInStonfi = {
    $$type: 'SwapNativeInStonfi';
    query_id: bigint;
    amount: bigint;
    tokenB: Address;
    minReturn: bigint;
    recipient_addr: Address;
    referral_addr: Address | null;
    additional_info: Slice | null;
    invalidQuery: Slice;
}

export function storeSwapNativeInStonfi(src: SwapNativeInStonfi) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(77161560, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.tokenB);
        b_0.storeCoins(src.minReturn);
        b_0.storeAddress(src.recipient_addr);
        let b_1 = new Builder();
        b_1.storeAddress(src.referral_addr);
        if (src.additional_info !== null && src.additional_info !== undefined) { b_1.storeBit(true).storeRef(src.additional_info.asCell()); } else { b_1.storeBit(false); }
        b_1.storeBuilder(src.invalidQuery.asBuilder());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwapNativeInStonfi(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 77161560) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _tokenB = sc_0.loadAddress();
    let _minReturn = sc_0.loadCoins();
    let _recipient_addr = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _referral_addr = sc_1.loadMaybeAddress();
    let _additional_info = sc_1.loadBit() ? sc_1.loadRef()?.asSlice() ?? null : null;
    let _invalidQuery = sc_1;
    return { $$type: 'SwapNativeInStonfi' as const, query_id: _query_id, amount: _amount, tokenB: _tokenB, minReturn: _minReturn, recipient_addr: _recipient_addr, referral_addr: _referral_addr, additional_info: _additional_info, invalidQuery: _invalidQuery };
}

function loadTupleSwapNativeInStonfi(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _tokenB = source.readAddress();
    let _minReturn = source.readBigNumber();
    let _recipient_addr = source.readAddress();
    let _referral_addr = source.readAddressOpt();
    let _additional_info = source.readCellOpt()?.asSlice() ?? null;
    let _invalidQuery = source.readCell().asSlice();
    return { $$type: 'SwapNativeInStonfi' as const, query_id: _query_id, amount: _amount, tokenB: _tokenB, minReturn: _minReturn, recipient_addr: _recipient_addr, referral_addr: _referral_addr, additional_info: _additional_info, invalidQuery: _invalidQuery };
}

function storeTupleSwapNativeInStonfi(source: SwapNativeInStonfi) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.tokenB);
    builder.writeNumber(source.minReturn);
    builder.writeAddress(source.recipient_addr);
    builder.writeAddress(source.referral_addr);
    builder.writeSlice(source.additional_info?.asCell());
    builder.writeSlice(source.invalidQuery.asCell());
    return builder.build();
}

function dictValueParserSwapNativeInStonfi(): DictionaryValue<SwapNativeInStonfi> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapNativeInStonfi(src)).endCell());
        },
        parse: (src) => {
            return loadSwapNativeInStonfi(src.loadRef().beginParse());
        }
    }
}

export type WithdrawInfo = {
    $$type: 'WithdrawInfo';
    token: Address | null;
    amount: bigint | null;
    to: Address | null;
    value: bigint | null;
    isNative: boolean;
}

export function storeWithdrawInfo(src: WithdrawInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3076232919, 32);
        b_0.storeAddress(src.token);
        if (src.amount !== null && src.amount !== undefined) { b_0.storeBit(true).storeCoins(src.amount); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.to);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true).storeCoins(src.value); } else { b_0.storeBit(false); }
        b_0.storeBit(src.isNative);
    };
}

export function loadWithdrawInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3076232919) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadMaybeAddress();
    let _amount = sc_0.loadBit() ? sc_0.loadCoins() : null;
    let _to = sc_0.loadMaybeAddress();
    let _value = sc_0.loadBit() ? sc_0.loadCoins() : null;
    let _isNative = sc_0.loadBit();
    return { $$type: 'WithdrawInfo' as const, token: _token, amount: _amount, to: _to, value: _value, isNative: _isNative };
}

function loadTupleWithdrawInfo(source: TupleReader) {
    let _token = source.readAddressOpt();
    let _amount = source.readBigNumberOpt();
    let _to = source.readAddressOpt();
    let _value = source.readBigNumberOpt();
    let _isNative = source.readBoolean();
    return { $$type: 'WithdrawInfo' as const, token: _token, amount: _amount, to: _to, value: _value, isNative: _isNative };
}

function storeTupleWithdrawInfo(source: WithdrawInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.isNative);
    return builder.build();
}

function dictValueParserWithdrawInfo(): DictionaryValue<WithdrawInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawInfo(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawInfo(src.loadRef().beginParse());
        }
    }
}

export type ChangeFwdFee = {
    $$type: 'ChangeFwdFee';
    stonfi_fwd: bigint;
}

export function storeChangeFwdFee(src: ChangeFwdFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1728951638, 32);
        b_0.storeUint(src.stonfi_fwd, 64);
    };
}

export function loadChangeFwdFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1728951638) { throw Error('Invalid prefix'); }
    let _stonfi_fwd = sc_0.loadUintBig(64);
    return { $$type: 'ChangeFwdFee' as const, stonfi_fwd: _stonfi_fwd };
}

function loadTupleChangeFwdFee(source: TupleReader) {
    let _stonfi_fwd = source.readBigNumber();
    return { $$type: 'ChangeFwdFee' as const, stonfi_fwd: _stonfi_fwd };
}

function storeTupleChangeFwdFee(source: ChangeFwdFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.stonfi_fwd);
    return builder.build();
}

function dictValueParserChangeFwdFee(): DictionaryValue<ChangeFwdFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeFwdFee(src)).endCell());
        },
        parse: (src) => {
            return loadChangeFwdFee(src.loadRef().beginParse());
        }
    }
}

export type ChangeProcessFee = {
    $$type: 'ChangeProcessFee';
    process_fee: bigint;
}

export function storeChangeProcessFee(src: ChangeProcessFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2162290971, 32);
        b_0.storeUint(src.process_fee, 64);
    };
}

export function loadChangeProcessFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2162290971) { throw Error('Invalid prefix'); }
    let _process_fee = sc_0.loadUintBig(64);
    return { $$type: 'ChangeProcessFee' as const, process_fee: _process_fee };
}

function loadTupleChangeProcessFee(source: TupleReader) {
    let _process_fee = source.readBigNumber();
    return { $$type: 'ChangeProcessFee' as const, process_fee: _process_fee };
}

function storeTupleChangeProcessFee(source: ChangeProcessFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.process_fee);
    return builder.build();
}

function dictValueParserChangeProcessFee(): DictionaryValue<ChangeProcessFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeProcessFee(src)).endCell());
        },
        parse: (src) => {
            return loadChangeProcessFee(src.loadRef().beginParse());
        }
    }
}

export type ChangeMinimumFee = {
    $$type: 'ChangeMinimumFee';
    minimum_fee: bigint;
}

export function storeChangeMinimumFee(src: ChangeMinimumFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1407651501, 32);
        b_0.storeUint(src.minimum_fee, 64);
    };
}

export function loadChangeMinimumFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1407651501) { throw Error('Invalid prefix'); }
    let _minimum_fee = sc_0.loadUintBig(64);
    return { $$type: 'ChangeMinimumFee' as const, minimum_fee: _minimum_fee };
}

function loadTupleChangeMinimumFee(source: TupleReader) {
    let _minimum_fee = source.readBigNumber();
    return { $$type: 'ChangeMinimumFee' as const, minimum_fee: _minimum_fee };
}

function storeTupleChangeMinimumFee(source: ChangeMinimumFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.minimum_fee);
    return builder.build();
}

function dictValueParserChangeMinimumFee(): DictionaryValue<ChangeMinimumFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeMinimumFee(src)).endCell());
        },
        parse: (src) => {
            return loadChangeMinimumFee(src.loadRef().beginParse());
        }
    }
}

export type DeleteRecord = {
    $$type: 'DeleteRecord';
    query_id: bigint;
}

export function storeDeleteRecord(src: DeleteRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1712740122, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadDeleteRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1712740122) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'DeleteRecord' as const, query_id: _query_id };
}

function loadTupleDeleteRecord(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'DeleteRecord' as const, query_id: _query_id };
}

function storeTupleDeleteRecord(source: DeleteRecord) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserDeleteRecord(): DictionaryValue<DeleteRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeleteRecord(src)).endCell());
        },
        parse: (src) => {
            return loadDeleteRecord(src.loadRef().beginParse());
        }
    }
}

export type ChangePub = {
    $$type: 'ChangePub';
    signer_pub: bigint;
}

export function storeChangePub(src: ChangePub) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(454924049, 32);
        b_0.storeUint(src.signer_pub, 256);
    };
}

export function loadChangePub(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 454924049) { throw Error('Invalid prefix'); }
    let _signer_pub = sc_0.loadUintBig(256);
    return { $$type: 'ChangePub' as const, signer_pub: _signer_pub };
}

function loadTupleChangePub(source: TupleReader) {
    let _signer_pub = source.readBigNumber();
    return { $$type: 'ChangePub' as const, signer_pub: _signer_pub };
}

function storeTupleChangePub(source: ChangePub) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.signer_pub);
    return builder.build();
}

function dictValueParserChangePub(): DictionaryValue<ChangePub> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangePub(src)).endCell());
        },
        parse: (src) => {
            return loadChangePub(src.loadRef().beginParse());
        }
    }
}

 type DexRouter_init_args = {
    $$type: 'DexRouter_init_args';
    owner: Address;
    seq: bigint;
}

function initDexRouter_init_args(src: DexRouter_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.seq, 257);
    };
}

async function DexRouter_init(owner: Address, seq: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDexRouter_init_args({ $$type: 'DexRouter_init_args', owner, seq })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const DexRouter_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    26695: { message: `msg.value too low` },
    40368: { message: `Contract stopped` },
    44535: { message: `amount = 0` },
    53296: { message: `Contract not stopped` },
    54159: { message: `should not reach here` },
}

const DexRouter_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonTransferForwardPayload","header":null,"fields":[{"name":"is_right","type":{"kind":"simple","type":"bool","optional":false}},{"name":"value","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"JettonTransferForwardPayload","optional":false}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"SwapInfo","header":null,"fields":[{"name":"tokenA","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SwapJettonInStonfi","header":null,"fields":[{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"transfer_jetton_fee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tokenB","type":{"kind":"simple","type":"address","optional":false}},{"name":"minReturn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient_addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"referral_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"additional_info","type":{"kind":"simple","type":"slice","optional":true}},{"name":"invalidQuery","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"DedustSuccessInfo","header":null,"fields":[{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DedustFailInfo","header":null,"fields":[{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenA","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DedustJettonSwapInfo","header":null,"fields":[{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"kind","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minReturn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"next","type":{"kind":"simple","type":"cell","optional":true}},{"name":"swapParams","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"DedustNativeSwapInfo","header":null,"fields":[{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"kind","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minReturn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"next","type":{"kind":"simple","type":"cell","optional":true}},{"name":"swapParams","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"DedustSwapParams","header":null,"fields":[{"name":"deadline","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"recipient_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"referral_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"fufill_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"reject_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"SwapJettonInDedust","header":null,"fields":[{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"transfer_jetton_fee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"vaultA","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"minReturn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"referral_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"next","type":{"kind":"simple","type":"cell","optional":true}},{"name":"additional_info","type":{"kind":"simple","type":"slice","optional":true}},{"name":"invalidQuery","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"DedustPayOut","header":1196394191,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":true}}]},
    {"name":"SwapNativeInDedust","header":3039744607,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"minReturn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"referral_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"next","type":{"kind":"simple","type":"cell","optional":true}},{"name":"additional_info","type":{"kind":"simple","type":"slice","optional":true}},{"name":"invalidQuery","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ValidInfo","header":null,"fields":[{"name":"isValid","type":{"kind":"simple","type":"bool","optional":false}},{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false}},{"name":"transfer_jetton_fee","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"JettonPayload","header":null,"fields":[{"name":"isStonFi","type":{"kind":"simple","type":"bool","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"AdditionalInfo","header":null,"fields":[{"name":"additional_info","type":{"kind":"simple","type":"slice","optional":true}}]},
    {"name":"SwapNativeInStonfi","header":77161560,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenB","type":{"kind":"simple","type":"address","optional":false}},{"name":"minReturn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient_addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"referral_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"additional_info","type":{"kind":"simple","type":"slice","optional":true}},{"name":"invalidQuery","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"WithdrawInfo","header":3076232919,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":true}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":true}},{"name":"value","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"isNative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ChangeFwdFee","header":1728951638,"fields":[{"name":"stonfi_fwd","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangeProcessFee","header":2162290971,"fields":[{"name":"process_fee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangeMinimumFee","header":1407651501,"fields":[{"name":"minimum_fee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeleteRecord","header":1712740122,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangePub","header":454924049,"fields":[{"name":"signer_pub","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
]

const DexRouter_getters: ABIGetter[] = [
    {"name":"getStonfiFwdAmount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getSeq","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getProcessFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getMiniumFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getUserStonfiProxyAddr","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getUserDedustProxyAddr","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const DexRouter_getterMapping: { [key: string]: string } = {
    'getStonfiFwdAmount': 'getGetStonfiFwdAmount',
    'getSeq': 'getGetSeq',
    'getProcessFee': 'getGetProcessFee',
    'getMiniumFee': 'getGetMiniumFee',
    'getUserStonfiProxyAddr': 'getGetUserStonfiProxyAddr',
    'getUserDedustProxyAddr': 'getGetUserDedustProxyAddr',
    'stopped': 'getStopped',
    'owner': 'getOwner',
}

const DexRouter_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SwapNativeInDedust"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SwapNativeInStonfi"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeFwdFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeProcessFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeMinimumFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawInfo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class DexRouter implements Contract {
    
    static async init(owner: Address, seq: bigint) {
        return await DexRouter_init(owner, seq);
    }
    
    static async fromInit(owner: Address, seq: bigint) {
        const init = await DexRouter_init(owner, seq);
        const address = contractAddress(0, init);
        return new DexRouter(address, init);
    }
    
    static fromAddress(address: Address) {
        return new DexRouter(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  DexRouter_types,
        getters: DexRouter_getters,
        receivers: DexRouter_receivers,
        errors: DexRouter_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: string | TokenNotification | SwapNativeInDedust | SwapNativeInStonfi | TokenExcesses | ChangeFwdFee | ChangeProcessFee | ChangeMinimumFee | WithdrawInfo | Deploy | 'Resume' | 'Stop' | ChangeOwner) {
        
        let body: Cell | null = null;
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SwapNativeInDedust') {
            body = beginCell().store(storeSwapNativeInDedust(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SwapNativeInStonfi') {
            body = beginCell().store(storeSwapNativeInStonfi(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeFwdFee') {
            body = beginCell().store(storeChangeFwdFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeProcessFee') {
            body = beginCell().store(storeChangeProcessFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeMinimumFee') {
            body = beginCell().store(storeChangeMinimumFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawInfo') {
            body = beginCell().store(storeWithdrawInfo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === 'Resume') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetStonfiFwdAmount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getStonfiFwdAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetSeq(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getSeq', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetProcessFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getProcessFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetMiniumFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getMiniumFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetUserStonfiProxyAddr(provider: ContractProvider, user: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        let source = (await provider.get('getUserStonfiProxyAddr', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetUserDedustProxyAddr(provider: ContractProvider, user: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        let source = (await provider.get('getUserDedustProxyAddr', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}