import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Axios } from '../AxiosConfig';

const Category = () => {
    let emptyProduct = {
        category: null,
        description: '',
        dealer: null,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownValues, setDropdownValues] = useState([]);

    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        
        Axios.get("/Cat/All").then((res) => {
            console.log(res.data.data.Categories)
            setProducts(res.data.data.Categories)

        })
        Axios.get("/Dealer/All").then((res) => {

            setDropdownValues(res.data.data.Dealers)
        }).catch((err) => {
            console.log(err)
        })
        console.log(dropdownValues);
        // eslint-disable-next-line
    }, []);


    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setEditDialog(false)
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };



    const saveProduct = async () => {
        setSubmitted(true);
        let _products = [...products];
        let _product = { ...product, CatId: "1029", CategoryDealer:"1008" };
        _products = [..._products, _product];
        console.log(_product)
        setProducts(_products);
        setProduct(emptyProduct);
        setProductDialog(false);
        await Axios.post("/Cat/AddCat", { Cat_name: product.CatName, Dealer_id: parseInt(dropdownValue.code) }).then((res) => {
            console.log(res);
        })
        
    };

    function getALL()
    {
        Axios.get("/Cat/All").then((res) => {
        console.log(res.data.data.Categories)
        setProducts(res.data.data.Categories)

        })
    }

    const saveEdit = async() => {
        setSubmitted(true);

        let _products = [...products];
        let _product = { ...product};
        const index = findIndexById(product.CatId);
        _products[index] = _product;

        await Axios.post("/Cat/UpdateCategory", { Cat_name: product.CatName, Cat_id:parseInt(product.CatId)}).then((res) => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
            setProducts(_products);
            setProduct(emptyProduct);
            setEditDialog(false);
        })
        
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setEditDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
        getALL();
    };

    const deleteProduct = async () => {
        let _products = products.filter((val) => val.CatId !== product.CatId);
        setProducts(_products);
        setDeleteProductDialog(false);
        await Axios.delete("/Cat/DelCategory", {
            headers: {
            },
            data: {
                Cat_id: parseInt(product.CatId)
            }
        }).then((res) => {
            console.log(res)
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
        })
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].CatId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

   
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };
  
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const codeBodyTemplate = (rowData) => {

        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.CatId}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.CatName}
            </>
        );
    };

    
    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {rowData.CategoryDealer}
            </>
        );
    };

    

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Categories</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const eitDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveEdit} />
        </>
    )
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="CatId" header="Code" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="CatName" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="CategoryDealer" header="Dealer Code" body={priceBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Category</label>
                            <InputText id="name" value={product.CatName} onChange={(e) => onInputChange(e, 'CatName')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.CatName })} />
                            {submitted && !product.name && <small className="p-invalid">product is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Category Description</label>
                            <InputTextarea id="description" value={product.CatId} onChange={(e) => onInputChange(e, 'discription')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} rows={3} cols={20} />
                            {submitted && !product.description && <small className="p-invalid">Enter Description.</small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="quantity">Select Dealer</label>
                                <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />
                            </div>
                        </div>
                    </Dialog>
                    <Dialog visible={editDialog} style={{ width: '450px' }} header="Category Details" modal className="p-fluid" footer={eitDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Category</label>
                            <InputText id="name" value={product.CatName} onChange={(e) => onInputChange(e, 'CatName')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.CatName })} />
                            {submitted && !product.name && <small className="p-invalid">Category is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Category Description</label>
                            <InputTextarea id="description" value={product.CatId} onChange={(e) => onInputChange(e, 'discription')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} rows={3} cols={20} />
                            {submitted && !product.description && <small className="p-invalid">Enter Description.</small>}
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Dealer ID</label>
                                <InputText id="price" value={product.CategoryDealer} locale="en-US" disabled />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Category;
