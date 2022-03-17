import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import CreateBudget from "./CreateBudget";


describe('Formulario crear cliente', () => { // Describir el suite test

    test('Check validación del campo CIF', () => { // Describe el case test
        render(<CreateBudget />);
        /* Hay una manera de comprobar qué es lo que tenemos en el renderizado
        const component = render(<CreateBudget />);
        component.debug(); */
        const cifInput = screen.getByTestId("cif");
        const validtationCifSpan = screen.getByTestId("validation-cif-span");
        userEvent.type(cifInput, 'Z');
        expect(validtationCifSpan).toHaveTextContent('Letra de CIF no válida');
        userEvent.type(cifInput, 'A1A');
        expect(validtationCifSpan).toHaveTextContent('El CIF debe tener 8 números');
    })
})