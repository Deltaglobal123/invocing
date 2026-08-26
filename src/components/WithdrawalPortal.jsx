import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  Printer, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

const WithdrawalPortal = () => {
  const [total, setTotal] = useState('');
  const [available, setAvailable] = useState('');
  const [seCharge, setSeCharge] = useState('');
  const [seChargeLabel, setSeChargeLabel] = useState('S & E charge');
  const [warningText, setWarningText] = useState(`has to pay
Securities & Exchange charge to
withdrawal the profit.`);
  const [noteText, setNoteText] = useState(`This fee is taken by S & E
board.`);
  const [ac, setAc] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [upiId, setUpiId] = useState('');
  const [paymentMode, setPaymentMode] = useState('bank'); // 'bank' or 'upi'
  const [amount, setAmount] = useState('');
  const [minWithdrawal, setMinWithdrawal] = useState('');
  const [commission, setCommission] = useState('');

  // Toggle state
  const [isGenerated, setIsGenerated] = useState(false);
  const [formError, setFormError] = useState('');

  // Helper to format values as INR xx,xx,xxx
  const formatINR = (val) => {
    if (val === undefined || val === null || val === '') return 'INR 0';
    const cleanVal = val.toString().replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanVal);
    if (isNaN(num)) return 'INR ' + val;
    return 'INR ' + num.toLocaleString('en-IN');
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setFormError('');

    if (!warningText.trim()) {
      setFormError('Warning notice text is required.');
      return;
    }
    if (!noteText.trim()) {
      setFormError('Note text is required.');
      return;
    }
    if (!total) {
      setFormError('Total balance is required.');
      return;
    }
    if (!available) {
      setFormError('Available balance is required.');
      return;
    }
    if (!seChargeLabel.trim()) {
      setFormError('S & E Charge Heading/Label is required.');
      return;
    }
    if (!seCharge) {
      setFormError(`${seChargeLabel} is required.`);
      return;
    }
    if (paymentMode === 'bank') {
      if (!ac) {
        setFormError('Bank Account number is required.');
        return;
      }
      if (!ifsc) {
        setFormError('IFSC code is required.');
        return;
      }
    } else {
      if (!upiId) {
        setFormError('UPI ID is required.');
        return;
      }
    }

    setIsGenerated(true);
  };

  return (
    <>
      {/* VIEW A: Configuration Form (Matches LedgerFlow Dark Glass UI) */}
      {!isGenerated ? (
        <div className="withdrawal-container animate-fade-in" style={{ paddingBottom: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h2>Withdrawal Portal Configurator</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Set up the exact variables to overlay and generate the Olymp Trade withdrawal screen.
            </p>
          </div>

          <div className="withdrawal-form-grid">
            <div className="glass-panel form-panel" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings size={20} style={{ color: 'var(--color-primary)' }} />
                Screen Parameters
              </h3>

              {formError && (
                <div 
                  style={{ 
                    background: 'var(--color-danger-bg)', 
                    color: 'var(--color-danger)', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '8px', 
                    fontSize: '0.85rem', 
                    marginBottom: '1.25rem',
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                  }}
                >
                  {formError}
                </div>
              )}

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Left Column Stats */}
                <h4 style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                  Left Sidebar Stats
                </h4>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Total Balance (INR)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Available for Withdrawal (INR)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={available}
                      onChange={(e) => setAvailable(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">S & E Charge Heading/Label</label>
                    <input
                      type="text"
                      className="form-input"
                      value={seChargeLabel}
                      onChange={(e) => setSeChargeLabel(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">S & E Charge Value (INR)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={seCharge}
                      onChange={(e) => setSeCharge(e.target.value)}
                    />
                  </div>
                </div>

                {/* Warning Alert Content */}
                <h4 style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginTop: '0.5rem' }}>
                  Alert & Gateway Parameters
                </h4>

                <div className="form-group">
                  <label className="form-label">Warning Notice Text</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    style={{ height: 'auto', fontFamily: 'inherit', resize: 'vertical', padding: '0.75rem' }}
                    value={warningText}
                    onChange={(e) => setWarningText(e.target.value)}
                    placeholder="e.g.&#10;hars has to pay&#10;Securities & Exchange charge to&#10;withdrawal the profit."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Note Text</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    style={{ height: 'auto', fontFamily: 'inherit', resize: 'vertical', padding: '0.75rem' }}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="e.g.&#10;This fee is taken by S & E&#10;board."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Details Type</label>
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input 
                        type="radio" 
                        name="paymentMode" 
                        value="bank" 
                        checked={paymentMode === 'bank'} 
                        onChange={() => setPaymentMode('bank')}
                      />
                      Bank Account
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input 
                        type="radio" 
                        name="paymentMode" 
                        value="upi" 
                        checked={paymentMode === 'upi'} 
                        onChange={() => setPaymentMode('upi')}
                      />
                      UPI ID
                    </label>
                  </div>
                </div>

                {paymentMode === 'bank' ? (
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Bank Account Number (A/C)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={ac}
                        onChange={(e) => setAc(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">IFSC Code</label>
                      <input
                        type="text"
                        className="form-input"
                        value={ifsc}
                        onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label">UPI ID</label>
                    <input
                      type="text"
                      className="form-input"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. user@bank"
                    />
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Amount input value (e.g. 2,41,640)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Commission display text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={commission}
                      onChange={(e) => setCommission(e.target.value)}
                    />
                  </div>
                </div>

                {/* Right Column Content */}
                <h4 style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginTop: '0.5rem' }}>
                  Right Sidebar Info
                </h4>

                <div className="form-group">
                  <label className="form-label">Minimum Withdrawal Amount (INR)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={minWithdrawal}
                    onChange={(e) => setMinWithdrawal(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}>
                  <span>Generate Exact Screen</span>
                </button>
              </form>
            </div>

            {/* Quick Preview Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-panel form-panel">
                <h4 style={{ marginBottom: '0.75rem' }}>Gateway Warning Preview</h4>
                <div style={{ fontSize: '0.85rem', color: '#ffb020', background: 'rgba(255, 176, 32, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px dashed rgba(255, 176, 32, 0.3)', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                  {warningText || 'hars has to pay\nSecurities & Exchange charge to\nwithdrawal the profit.'}
                  <div style={{ fontWeight: 'bold', marginTop: '6px' }}>
                    NOTE :- {noteText || 'This fee is taken by S & E\nboard.'}
                  </div>
                </div>
              </div>

              <div className="glass-panel form-panel">
                <h4 style={{ marginBottom: '0.5rem' }}>Details Checklist</h4>
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                  <li>Left sidebar: Total, Available, S&E charges.</li>
                  <li>S&E charge statement and amount select box.</li>
                  <li>Second warning box: UPI QR limits, A/C & IFSC (or UPI ID).</li>
                  <li>Amount INR text input.</li>
                  <li>Payment method dropdown, Commission.</li>
                  <li>Right sidebar: Min withdrawal notice.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW B: EXACT REPLICA OF THE OLYMP TRADE SCREEN (Full Screen Overlay) */
        <div className="ot-page-wrapper" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, overflowY: 'auto' }}>
          {/* Header */}
          <header className="ot-header">
            <button className="ot-hamburger-btn">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <img 
              src={`${import.meta.env.BASE_URL}olymp-logo.png`}
              alt="Olymp Trade Logo" 
              className="ot-logo-img" 
              onClick={() => setIsGenerated(false)}
              style={{ cursor: 'pointer' }}
            />
          </header>

          {/* Navigation Bar */}
          <div className="ot-navbar">
            <div className="ot-navbar-content">
              <button className="ot-nav-tab active">Withdraw</button>
              <button className="ot-nav-tab">Transactions</button>
              <button className="ot-nav-tab">Trades</button>
              <button className="ot-nav-tab">Profile</button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="ot-grid-container">
            {/* Left Column: Stat summaries */}
            <div className="ot-left-column">
              <div className="ot-stat-item">
                <span className="ot-stat-label">Total</span>
                <span className="ot-stat-value">{formatINR(total)}</span>
              </div>
              <div className="ot-stat-item">
                <span className="ot-stat-label">Available for Withdrawal</span>
                <span className="ot-stat-value">{formatINR(available)}</span>
              </div>
              <div className="ot-stat-item">
                <span className="ot-stat-label">{seChargeLabel}</span>
                <span className="ot-stat-value">{formatINR(seCharge)}</span>
              </div>
            </div>

             {/* Middle Column: Warning boxes, inputs */}
            <div className="ot-mid-column">
              {/* Alert 1: Name and S&E notice */}
              <div className="ot-alert-box">
                <div className="ot-alert-icon-wrapper">
                  <img src={`${import.meta.env.BASE_URL}olymp-arrow.png`} alt="Notice Icon" className="ot-alert-pointer-icon" />
                </div>
                <p className="ot-alert-text" style={{ whiteSpace: 'pre-line' }}>
                  {warningText}
                  <span className="ot-alert-note" style={{ display: 'block', marginTop: '6px' }}>
                    NOTE :- {noteText}
                  </span>
                </p>
              </div>

              {/* S&E Charges Select Box */}
              <div className="ot-dropdown-field">
                <span>{formatINR(seCharge)}</span>
                <span className="arrow"></span>
              </div>

              {/* Alert 2: Bank information & UPI QR limits */}
              <div className="ot-alert-box">
                <div className="ot-alert-icon-wrapper">
                  <img src={`${import.meta.env.BASE_URL}olymp-arrow.png`} alt="Notice Icon" className="ot-alert-pointer-icon" />
                </div>
                <div className="ot-alert-text" style={{ fontWeight: 600 }}>
                  UPI QR up to {formatINR(available)} 
                  <span 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      border: '1.5px solid #8596a6', 
                      color: '#8596a6', 
                      borderRadius: '50%', 
                      width: '13px', 
                      height: '13px', 
                      fontSize: '9px',
                      marginLeft: '6px',
                      fontWeight: 'bold',
                      verticalAlign: 'middle',
                      cursor: 'help'
                    }}
                  >
                    ?
                  </span>
                  {paymentMode === 'bank' ? (
                    <>
                      <div style={{ fontWeight: 500, marginTop: '5px' }}>
                        A/C :- {ac}
                      </div>
                      <div style={{ fontWeight: 500 }}>
                        IFSC :- {ifsc}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontWeight: 500, marginTop: '5px' }}>
                      UPI ID :- {upiId}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Box */}
              <div className="ot-input-field-wrapper">
                <input 
                  type="text" 
                  className="ot-text-input" 
                  placeholder="Amount, INR"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Payment Method Select Dropdown */}
              <div className="ot-dropdown-label-only">
                <span>Payment method</span>
                <span className="arrow"></span>
              </div>

              {/* Commission Statement */}
              <div className="ot-commission-row">
                <span className="ot-commission-label">
                  Commission
                  <span 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      border: '1px solid #8596a6', 
                      color: '#8596a6', 
                      borderRadius: '50%', 
                      width: '11px', 
                      height: '11px', 
                      fontSize: '8px',
                      fontWeight: 'bold'
                    }}
                  >
                    ?
                  </span>
                </span>
                <span className="ot-commission-value">{commission}</span>
              </div>
            </div>

            {/* Right Column: Minimum withdrawal guidelines */}
            <div className="ot-right-column">
              <h3 className="ot-right-column-title">
                Minimum withdrawal<br />
                amount {formatINR(minWithdrawal)}
              </h3>
              <p style={{ marginTop: '8px' }}>
                Withdrawals are processed<br />
                by the same payment<br />
                systems<br />
                used to deposit money into<br />
                your account.
              </p>
              <p className="ot-right-column-bold-info" style={{ marginTop: '16px' }}>
                For more information,<br />
                please refer to the <span className="ot-help-center-link">Help<br />
                Center</span>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawalPortal;
