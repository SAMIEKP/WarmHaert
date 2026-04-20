import { useEffect, useState } from 'react';
import { Shield, Download, Printer, ArrowLeft } from 'lucide-react';
import { formatMWK } from '../lib/currency';

interface ReceiptData {
  method: string;
  total: number;
  date: string;
  details: any;
  items: any[];
}

interface ReceiptProps {
  refId?: string;
}

export default function Receipt({ refId }: ReceiptProps) {
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  useEffect(() => {
    if (refId) {
      const saved = localStorage.getItem('receipt_' + refId);
      if (saved) {
        try {
          setReceipt(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to parse receipt from localStorage:', error);
          setReceipt(null);
        }
      }
    }
  }, [refId]);

  const printReceipt = () => window.print();

  if (!receipt) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Download className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">No Receipt Found</h2>
          <p className="text-gray-500 mb-8">Return to cart and complete payment.</p>
          <a href="/cart" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-receipt, .print-receipt * { visibility: visible; }
          .print-receipt { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl p-12 print-receipt">
          {/* Header */}
          <div className="text-center border-b pb-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-gold" />
              <h1 className="text-4xl font-display font-bold">WarmHeart Travel</h1>
            </div>
            <p className="text-gray-500 uppercase tracking-widest font-bold">Payment Receipt</p>
            <p className="text-2xl font-bold text-navy mt-2">Ref: {refId}</p>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-gray-700">Payment Method</h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="font-bold text-xl text-navy">{receipt.method}</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-gray-700">Date & Time</h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="font-mono text-sm">{new Date(receipt.date).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-8 text-center mb-8">
            <h3 className="text-3xl font-display font-bold text-navy mb-2">TOTAL PAID</h3>
            <div className="text-4xl font-bold text-gold">{formatMWK(receipt.total)}</div>
          </div>

          {/* Items Summary */}
          <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-gray-700">Items Booked</h3>
          {receipt.items.slice(0, 3).map((item: any, i: number) => (
            <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span>{item.item.name || item.item.title || `${item.item.make} ${item.item.model}`}</span>
              <span className="font-bold">{formatMWK(item.price)}</span>
            </div>
          ))}
          {receipt.items.length > 3 && (
            <p className="text-center text-gray-500 mt-4">+ {receipt.items.length - 3} more items</p>
          )}

          <div className="text-center mt-12 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-4">Thank you for choosing WarmHeart</p>
            <p className="text-xs text-gray-400">Contact +265 999 123 456 for support</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button onClick={printReceipt} className="flex-1 bg-navy text-white py-3 px-6 rounded-xl font-bold hover:bg-gold transition-colors flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" />
            Print Receipt
          </button>
          <button onClick={() => {
            const receiptHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>WarmHeart Receipt ${refId}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #F5A623; padding-bottom: 20px; margin-bottom: 30px; }
    .gold { color: #F5A623; }
    .navy { color: #0A1628; }
    .total { font-size: 2em; font-weight: bold; text-align: center; background: #F5A623; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
    .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="navy">WarmHeart Travel</h1>
    <p>Payment Receipt</p>
    <p style="font-size: 1.5em; font-weight: bold;">Ref: ${refId}</p>
  </div>
  <div>
    <h3>Payment Method</h3>
    <p>${receipt.method}</p>
    <h3>Date & Time</h3>
    <p>${new Date(receipt.date).toLocaleString()}</p>
  </div>
  <div class="total">${formatMWK(receipt.total)}</div>
  <h3>Items Booked</h3>
  ${receipt.items.slice(0, 5).map((item: any) => `
    <div class="item">
      <span>${item.item.name || item.item.title || `${item.item.make || ''} ${item.item.model || ''}`.trim()}</span>
      <span>${formatMWK(item.price)}</span>
    </div>
  `).join('')}
  ${receipt.items.length > 5 ? '<p style="text-align: center; color: #666;">+ ' + (receipt.items.length - 5) + ' more items</p>' : ''}
  <div class="footer">
    <p>Thank you for traveling with WarmHeart!</p>
    <p>Contact: +265 999 123 456 | support@warmheart.travel</p>
  </div>
</body>
</html>`;
            const receiptBlob = new Blob([receiptHtml], { type: 'application/pdf' });
            const url = URL.createObjectURL(receiptBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `warmheart-receipt-${refId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
          }} className="flex-1 bg-gold text-navy py-3 px-6 rounded-xl font-bold hover:bg-gold/90 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

