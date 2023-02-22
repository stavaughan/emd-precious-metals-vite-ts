import { LoaderButton } from '@/components/Buttons';
import { themeClasses } from '@/theme';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { IReactToPrintProps } from "react-to-print";
import { useReactToPrint } from "react-to-print";
import type { PrintComponentProps } from './services.types';

const PrintComponent = ({
	componentRef,
	setPrinting,
	documentTitle,
	disable,
	margin = ''
}: PrintComponentProps) => {

    const { button } = themeClasses;
    const beforePrintResolve = useRef({});

    const [loading, setLoading] = useState(false);

    const printContent = useCallback(() => componentRef.current, [componentRef.current]);

    const loadItemToPrint = useCallback(() => {
        return new Promise<void>((resolve) => {
            beforePrintResolve.current = resolve;
            const timer = setTimeout(() => {
                setLoading(false);
                resolve();
            }, 2000);
			return () => clearTimeout(timer);
        });
    }, [])

    const handleBeforeContent = () => {
		!!setPrinting && setPrinting(true);
		setLoading(true)
	};

    useEffect(() => {
        if(loading) {
            loadItemToPrint()
        }
    }, [loadItemToPrint, loading])

    const handlePrint = useReactToPrint({
        content: printContent,
        documentTitle,
        onBeforeGetContent: handleBeforeContent,
		onAfterPrint: () => {
			!!setPrinting && setPrinting(false);
			beforePrintResolve.current = () => null;
		},
        removeAfterPrint: true
    } as IReactToPrintProps);

    useEffect(() => {
        if (typeof beforePrintResolve.current === "function") {
            beforePrintResolve.current();
        }
    }, []);

    return (
        <LoaderButton
            className={clsx(button.icon.light, margin)}
            setOnclick={handlePrint}
            setLoading={setLoading}
            loading={loading}
			disabled={disable}
            icon="print"
        />
    );
};

export default PrintComponent;
