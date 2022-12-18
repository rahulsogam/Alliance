import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Axios } from '../AxiosConfig';

const Product = () => {
    let emptyProduct = {
        product_id:0,
        update_Qty:0,
        product_Name: null,
        product_Description:null,
        product_Qty:null,
        category_Name:'',
        category_Id: null,
    };
    var stock = "INSTOCK";
    var lowstock = "LOWSTOCK";
    var outstock = "OUTOFSTOCK";
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
                "category_Id": "1014",
                "product_Description": "Red Meat",
                "product_id": "1",
                "product_Qty": "100",
                "product_Name": "Ham",
                "category_Name": "Meat & Beef"
            },
            {
                "category_Id": "1014",
                "product_Description": "Red Meat",
                "product_id": "2",
                "product_Qty": "160",
                "product_Name": "Turkey",
                "category_Name": "Meat & Beef"
            },
            {
                "category_Id": "1014",
                "product_Description": "Red Meat",
                "product_id": "3",
                "product_Qty": "160",
                "product_Name": "Turkey",
                "category_Name": "Meat & Beef"
            },
            {
                "category_Id": "101",
                "product_Description": "White Paneer",
                "product_id": "4",
                "product_Qty": "260",
                "product_Name": "Panner",
                "category_Name": "Dairy_Products"
            },
            {
                "category_Id": "101",
                "product_Description": "Falvoured Yogurts",
                "product_id": "5",
                "product_Qty": "210",
                "product_Name": "Yogurt",
                "category_Name": "Dairy_Products"
            }
        ])
        Axios.get("/Product/GetProducts").then((res) => {
            console.log(res.data.data.Products)
            setProducts(res.data.data.Products)

        })
        Axios.get("/Dealer/All").then((res) => {
            setDropdownValues(res.data.data.Dealers)
        }).catch((err) => {
            console.log(err)
        })

        // Axios.get("/Dealer/All").then((res) => {

        //     setDropdownValues(res.data.data.Dealers)
        // }).catch((err) => {
        //     console.log(err)
        // })
        console.log(dropdownValues);
        // eslint-disable-next-line
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

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
        let _product = { ...product, CatID: "1022" };
        _products = [..._products, _product]
        setProducts(_products);
        setProduct(emptyProduct);
        await Axios.post("/Cat/AddCat", { Cat_name: product.CatName, Dealer_id: parseInt(dropdownValue.code) }).then((res) => {
            console.log(res);
            setProductDialog(false);
        })
    };

    const saveEdit = async () => {
        setSubmitted(true);

        let _products = [...products];
        let _product = { ...product };
        const index = findIndexById(product.product_id);
        _products[index] = {..._product,product_Qty:product.update_Qty};
        console.log(_products)
        await Axios.post("Product/UpdateProductQty", { ProductId: parseInt(product.product_id), ProductQty:parseInt(product.update_Qty) }).then((res) => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Quantity Updated', life: 3000 });
            setProducts(_products);
            setProduct(emptyProduct);
            setEditDialog(false);
        })
    };

    const editProduct = (product) => {
        console.log(product);
        setProduct({ ...product });
        setEditDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    // const deleteProduct = async () => {
    //     let _products = products.filter((val) => val.CatId !== product.CatId);
    //     setProducts(_products);
    //     setDeleteProductDialog(false);
    //     await Axios.delete("/Cat/DelCategory", {
    //         headers: {
    //         },
    //         data: {
    //             Cat_id: parseInt(product.CatId)
    //         }
    //     }).then((res) => {
    //         console.log(res)
    //         setProduct(emptyProduct);
    //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    //     })
    // };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].product_id === id) {
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

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <div className="my-2">
    //                 <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
    //                 <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
    //             </div>
    //         </React.Fragment>
    //     );
    // };

    // const rightToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
    //             <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
    //         </React.Fragment>
    //     );
    // };

    const codeBodyTemplate = (rowData) => {

        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.category_Id}
            </>
        );
    };

    const productnameTemplate = (rowData) => {

        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.product_Name}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.product_Description}
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
                {formatCurrency(rowData.product_Qty)}
            </>
        );
    };

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.product_id)}
            </>
        );
    };
    const custnoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.category_Name)}
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
        if(rowData.product_Qty ==0) {
            return (
                <>
                    <span className="p-column-title">Status</span>
                    <span className={`product-badge status-${outstock.toLowerCase()}`}>{outstock}</span>
                </>
            );
        }
        else if (rowData.product_Qty <= 160) {
            return (
                <>
                    <span className="p-column-title">Status</span>
                    <span className={`product-badge status-${lowstock.toLowerCase()}`}>{lowstock}</span>
                </>
            );
        } else {
            return (

                <>
                    <span className="p-column-title">Status</span>
                    <span className={`product-badge status-${stock.toLowerCase()}`}>{stock}</span>
                </>
            );
        }

    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} /> */}
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Product detail</h5>
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
    // const deleteProductDialogFooter = (
    //     <>
    //         <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
    //         <Button label="Yes" icon="pi pi-check" className="p-button-text" />
    //     </>
    // );
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
                    {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

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
                        <Column field="product_id" header="Product ID" body={emailBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="product_Name" header="Product Name" sortable body={productnameTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="category_Id" header="Category ID" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="category_Name" header="Category Name" body={custnoBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>

                        <Column field="product_Description" header="Product Description" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="product_Qty" header="Product Quantity" body={priceBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="product_Qty" header="Product Status" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>

                        <Column header="Update Quantity" body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Product</label>
                            <InputText id="name" value={product.product_Name} onChange={(e) => onInputChange(e, 'product_Name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.product_Name })} />
                            {submitted && !product.name && <small className="p-invalid">Category is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Product Description</label>
                            <InputTextarea id="description" value={product.CatId} onChange={(e) => onInputChange(e, 'discription')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} rows={3} cols={20} />
                            {submitted && !product.description && <small className="p-invalid">Enter Description.</small>}
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Select Category</label>
                                <InputText id="price" value={product.CategoryDealer} locale="en-US" disabled />
                            </div>
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

                        <div className="field col">
                            <label htmlFor="quantity">Select Dealer</label>
                            <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />
                            {/* <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly /> */}
                        </div>
                    </Dialog>
                    <Dialog visible={editDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={eitDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field" hidden>
                            <label htmlFor="name">ProductId</label>
                            <InputText id="name" value={product.product_id}  onChange={(e) => onInputChange(e, 'product_id')} readOnly required autoFocus className={classNames({ 'p-invalid': submitted && !product.CatName })} />
                        </div>
                        <div className="field">
                            <label htmlFor="name">Product</label>
                            <InputText id="name" value={product.product_Name} onChange={(e) => onInputChange(e, 'CatName')} readOnly required autoFocus className={classNames({ 'p-invalid': submitted && !product.CatName })} />
                            {submitted && !product.name && <small className="p-invalid">Category is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Available Quantity</label>
                            <InputTextarea id="description" value={product.product_Qty} onChange={(e) => onInputChange(e, 'discription')} readOnly required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} rows={3} cols={20} />
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
                                <label htmlFor="price">Update Quantity</label>
                                <InputText id="price" value={null}  onChange={(e) => onInputChange(e, 'update_Qty')}locale="en-US"  />
                            </div>
                            {/*  <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                            </div> */}
                        </div>
                    </Dialog>

                    {/* <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog> */}

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

export default Product;
