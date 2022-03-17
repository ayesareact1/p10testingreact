import React, {useEffect, useState} from 'react'

export default function CreateBudget() {

    const [values, setValues] = useState({
        customer: '',
        cif: '',
        date: new Date().toISOString().substring(0,10),
        amount: 0,
        tax: 0.21
    })

    const [validFields, setValidFields] = useState({
        customer: {valid: false, message: '*'},
        cif: {valid: false, message: '*'},
    })

    const [calculateFields, setCalculateFields] = useState({
        taxAmount: 0,
        totalBudget: 0
    })

    const [isValidForm, setIsValidForm] = useState(false);

    const validateInput = (name, value) => {
        switch (name) {
            case 'customer':
                if(value.length < 4) {
                    setValidFields({
                       ...validFields,
                       customer: {valid: false, message: 'El cliente debe tener al menos 4 caracteres'}
                    })
                } else {
                    setValidFields({
                       ...validFields,
                       customer: {valid: true, message: ''}
                    })
                }
                break;
            case 'cif':
                if (!new RegExp(/([ABCDEFGHPQSKLMX])/i).test(value)) {
                    setValidFields({
                        ...validFields,
                        cif: {valid: false, message: 'Letra de CIF no válida'}
                     })
                } else if (!new RegExp(/([0-9]{8})/i).test(value.substring(1))) {
                    setValidFields({
                        ...validFields,
                        cif: {valid: false, message: 'El CIF debe tener 8 números'}
                     })
                } else {
                    setValidFields({
                        ...validFields,
                        cif: {valid: true, message: ''}
                     })
                }
            default:
                break;
        } 
    }

    const handleOnChange = e => {
        setValues(() => {
            validateInput(e.target.name, e.target.value);
            return {...values, [e.target.name]: e.target.value};
        })
    }

    useEffect(() => {
        const taxAmount = values.amount * values.tax;
        const totalBudget = Number(values.amount) + taxAmount;
        setCalculateFields({taxAmount, totalBudget});
    }, [values.amount, values.tax])


    useEffect(() => {
        if(validFields.customer.valid && validFields.cif.valid) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    }, [validFields])

    const handleOnSubmit = e => {
        e.preventDefault();
        console.log(values);
    }


    return (
        <div className="container">
            <form onSubmit={handleOnSubmit}>
                <div className="row">
                    <div className="col-100">
                        <label>
                            Cliente
                            <span className="alert"> {validFields.customer.message}</span>
                        </label>
                        <input type="text" 
                               name="customer"
                               value={values.customer}
                               onChange={handleOnChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-50">
                        <label>
                            CIF
                            <span className="alert"> {validFields.cif.message}</span>
                        </label>
                        <input type="text" 
                               name="cif"
                               value={values.cif}
                               onChange={handleOnChange}
                               maxLength={9}/>
                    </div>
                    <div className="col-50">
                        <label>Fecha presupuesto</label>
                        <input type="date" 
                               name="date"
                               value={values.date}
                               onChange={handleOnChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-50"></div>
                    <div className="col-50">
                        <label>Importe presupuesto</label>
                        <input type="number" 
                               name="amount"
                               value={values.amount}
                               onChange={handleOnChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-50"></div>
                    <div className="col-50">
                        <label>% IVA</label>
                        <select name="tax"
                                value={values.tax}
                                onChange={handleOnChange}>
                            <option value={0}>0 %</option>
                            <option value={0.04}>4 %</option>
                            <option value={0.1}>10 %</option>
                            <option value={0.21}>21 %</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-50"></div>
                    <div className="col-50">
                        <label>Importe IVA</label>
                        <input type="number" 
                               readOnly
                               value={calculateFields.taxAmount}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-50"></div>
                    <div className="col-50">
                        <label>Total Presupuesto</label>
                        <input type="number" 
                               readOnly
                               value={calculateFields.totalBudget}/>
                    </div>
                </div>
                <div className="row end">
                    <button disabled={!isValidForm} type="submit">Enviar</button>
                </div>
            </form>
        </div>
    )
}
