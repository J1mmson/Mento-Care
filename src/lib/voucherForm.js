// Otwiera okno zamówienia vouchera z dowolnego miejsca strony (nasłuchuje src/sections/Voucher.jsx)
export const OPEN_VOUCHER_FORM = "mc:kup-voucher";
export const openVoucherForm = () => window.dispatchEvent(new Event(OPEN_VOUCHER_FORM));
