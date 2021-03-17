import './Account.css';
import editPNG from './../../assets/edit.png';

const Account = () => {
    return (
        <article id="account" className="pa1 black-80 mb6 center mw6 account-container">
            <h1 className="f1 mb2">Account</h1>
            <form action="account_submit" method="get" acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Account</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="account-firstname">First Name</label>
                        <input className="pa2 input-reset bn w-100 measure" type="text" name="account-firstname"  id="account-firstname" value="Selam" readOnly/>
                        <span className="edit-btn-container ml2 relative"><img src={editPNG} alt="Edit button"/></span>

                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="account-lastname">Last Name</label>
                        <input className="pa2 input-reset bn w-100 measure" type="text" name="account-lastname"  id="account-lastname" value="Moges" readOnly/>
                        <span className="edit-btn-container ml2 relative"><img src={editPNG} alt="Edit button"/></span>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="account-grad-year">Graduation Year</label>
                        <input className="pa2 input-reset bn w-100 measure" type="text" name="account-grad-year"  id="account-grad-year" value="2024" readOnly/>
                        <span className="edit-btn-container ml2 relative"><img src={editPNG} alt="Edit button"/></span>
                    </div>
                    <div className="mt3">
                        <label className="db f5 fw4 lh-copy" htmlFor="account-workstatus">Work Authorization Status</label>
                        <div className="work-status pl4">
                                <div className="work-status-q-1">
                                    <p className="f6" >Are you legally allowed to work in the US?</p>
                                    <div className="flex ml4">
                                        <div className="pa2">
                                            <input type="radio" id="legal" name="legal" value="Yes" checked />
                                            <label htmlFor="legal">Yes</label>
                                        </div>

                                        <div className="pa2">
                                            <input type="radio" id="not_legal" name="not_legal" value="No" />
                                            <label htmlFor="not_legal">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-status-q-2">
                                    <p className="f6" >Will you now or in the future need visa sponsorship?</p>
                                    <div className="flex ml4">
                                        <div className="pa2">
                                            <input type="radio" id="need_visa" name="need_visa" value="Yes"  />
                                            <label htmlFor="legal">Yes</label>
                                        </div>

                                        <div className="pa2">
                                            <input type="radio" id="no_visa" name="no_visa" value="No" checked/>
                                            <label htmlFor="no_visa">No</label>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                </fieldset>
            </form>
        </article>
    )
}

export default Account;