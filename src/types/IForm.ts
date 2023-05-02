export interface FormProps {
    open: boolean;
    handleClose: () => void;
    dataId?: number;
    service: any;
    fields?: any;
    options?: any;
    confirm?: (search: string) => Promise<void>;
}