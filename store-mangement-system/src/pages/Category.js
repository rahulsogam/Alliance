import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import ProductService from '../service/ProductService';
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
        setProducts([
            {
                "CategoryDealer": "1001",
                "CatId": "101",
                "CatName": "Dairy_Products"
            },
            {
                "CategoryDealer": "1001",
                "CatId": "1014",
                "CatName": "Meat"
            },
            {
                "CategoryDealer": "1001",
                "CatId": "1015",
                "CatName": "Stationary"
            },
            {
                "CategoryDealer": "1001",
                "CatId": "1016",
                "CatName": "Stationary"
            },
            {
                "CategoryDealer": "1001",
                "CatId": "1017",
                "CatName": "Stationary"
            },
            {
                "CategoryDealer": "1001",
                "CatId": "1018",
                "CatName": "Stationary"
            }
        ])
        setDropdownValue([
            {
                "DealerEmail": "aba",
                "code": "1001",
                "DealerAddress": "xyz",
                "name": "Tesco",
                "DealerContact": "123123       "
            },
            {
                "DealerEmail": "asdasdsa",
                "code": "1002",
                "DealerAddress": "ababav",
                "name": "Aldi",
                "DealerContact": "12371273621  "
            },
            {
                "DealerEmail": "asdasdsa",
                "code": "1003",
                "DealerAddress": "ababav",
                "name": "Lidl",
                "DealerContact": "12371273621  "
            },
            {
                "DealerEmail": "asdasdsa",
                "code": "1004",
                "DealerAddress": "ababav",
                "name": "EutoGiant",
                "DealerContact": "12371273621  "
            },
            {
                "DealerEmail": "asdasdsa",
                "code": "1005",
                "DealerAddress": "ababav",
                "name": "Centra",
                "DealerContact": "12371273621  "
            },
            {
                "DealerEmail": "asdasdsa",
                "code": "1006",
                "DealerAddress": "ababav",
                "name": "Spar",
                "DealerContact": "12371273621  "
            }
        ])
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


    // const saveCategory = () => {
    //     setSubmitted(true);

    //     if (product.name.trim()) {
    //         let _products = [...products];
    //         let _product = { ...product };
    //         if (product.id) {
    //             const index = findIndexById(product.id);

    //             _products[index] = _product;
    //             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         } else {
    //             _product.id = createId();
    //             _product.image = 'product-placeholder.svg';
    //             _products.push(_product);
    //             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         }

    //         setProducts(_products);
    //         setProductDialog(false);
    //         setProduct(emptyProduct);
    //     }
    // };

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

    const saveEdit = async() => {
        setSubmitted(true);

        let _products = [...products];
        let _product = { ...product};
        const index = findIndexById(product.CatId);
        _products[index] = _product;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
        setProducts(_products);
        setProduct(emptyProduct);
        setEditDialog(false);
        await Axios.post("/Cat/UpdateCategory", { Cat_name: product.CatName, Cat_id:parseInt(product.CatId)}).then((res) => {
        })
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setEditDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
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
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
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

    // const onCategoryChange = (e) => {
    //     let _product = { ...product };
    //     _product['category'] = e.value;
    //     setProduct(_product);
    // };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    // const onInputNumberChange = (e, name) => {
    //     const val = e.value || 0;
    //     let _product = { ...product };
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    // };

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

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`assets/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
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

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readOnly cancel={false} />
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
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
                            <label htmlFor="description">Product Description</label>
                            <InputTextarea id="description" value={product.CatId} onChange={(e) => onInputChange(e, 'discription')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} rows={3} cols={20} />
                            {submitted && !product.description && <small className="p-invalid">Enter Description.</small>}
                        </div>

                        {/* <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div> */}

                        <div className="formgrid grid">
                            {/* <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                            </div> */}
                            <div className="field col">
                                <label htmlFor="quantity">Select Dealer</label>
                                <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />
                                {/* <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly /> */}
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

                        {/* <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div> */}

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Dealer ID</label>
                                <InputText id="price" value={product.CategoryDealer} locale="en-US" disabled />
                            </div>
                            {/*  <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                            </div> */}
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
