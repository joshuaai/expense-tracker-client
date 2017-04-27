export {amountFormat}

function amountFormat(amount) {
    return '‎GH₵ ' + Number(amount).toLocaleString();
}