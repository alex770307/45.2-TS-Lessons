// import { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import styles from './products.module.css';
// import ProductCard from '../productCard/ProductCard';
// import MyButton from '../myButton/MyButton';
// import Loader from '../loader/Loader';
// import Cart from '../cart/Cart';

// export interface IProduct {
//     id: number;
//     title: string;
//     price: number;
//     description: string;
//     image: string;
//     rating: {
//         rate: number;
//         count: number;
//     };
// }

// export default function Products(): JSX.Element {
//     const [products, setProducts] = useState<IProduct[]>([]);
//     const [limit, setLimit] = useState<number>(5);
//     const [loading, setLoading] = useState<boolean>(true);

//     const getProducts = async (limit: number) => {
//         setLoading(true);
//         const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
//         const data: IProduct[] = await res.json();
//         setProducts(data);
//         setLoading(false);
//     };

//     useEffect(() => {
//         getProducts(limit);
//     }, [limit]);

//     const formik = useFormik({
//       initialValues: {
//         quantity: 10,
//       },
//       validationSchema: Yup.object().shape({
//         quantity: Yup.number()
//           .typeError("Enter the number")
//           .min(1, "Minimum value 1")
//           .max(20, "Maximum value 20")
//           .required("Required field"),
//       }),
//       onSubmit: (values) => {
//         setLimit(values.quantity);
//       },
//     });

//     return (
//         <>
//         <Cart />
//         <div>
//             <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
//                 <label htmlFor="quantity">Quantity of products:</label>
//                 <input
//                     id="quantity"
//                     name="quantity"
//                     type="number"
//                     value={formik.values.quantity}
//                     onChange={formik.handleChange}
//                 />
//                 {formik.errors && 
//                 <p>{formik.errors.quantity}</p>}
//                 <MyButton type='submit' text='Loading' />
//             </form>

//             {loading ? ( <Loader /> ) : (
//                 <div className={styles.gridContainer}>
//                     {products.map(product => (
//                         <ProductCard
//                             key={product.id}
//                             title={product.title}
//                             image={product.image}
//                             price={product.price}
//                             id={product.id} />
//                     ))}
//                 </div>
//             )}

//         </div>
//         </>
//     );
// }

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './products.module.css';
import ProductCard from '../productCard/ProductCard';
import MyButton from '../myButton/MyButton';
import Loader from '../loader/Loader';
import Cart from '../cart/Cart';
import { useFavorites } from '../../favoritesContext/FavoritesContext';
import classNames from 'classnames';

export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default function Products(): JSX.Element {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [limit, setLimit] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(true);

    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

    const getProducts = async (limit: number) => {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
        const data: IProduct[] = await res.json();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        getProducts(limit);
    }, [limit]);

    const formik = useFormik({
        initialValues: {
            quantity: 10,
        },
        validationSchema: Yup.object().shape({
            quantity: Yup.number()
                .typeError("Enter the number")
                .min(1, "Minimum value 1")
                .max(20, "Maximum value 20")
                .required("Required field"),
        }),
        onSubmit: (values) => {
            setLimit(values.quantity);
        },
    });

    return (
        <>
            <Cart />
            <div>
                <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                    <label htmlFor="quantity">Quantity of products:</label>
                    <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                    />
                    {formik.errors &&
                        <p>{formik.errors.quantity}</p>}
                    <MyButton type='submit' text='Loading' />
                </form>

                {loading ? (<Loader />) : (
                    <div className={styles.gridContainer}>
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                title={product.title}
                                image={product.image}
                                price={product.price}
                                id={product.id}
                                addToFavorites={addToFavorites}
                                removeFromFavorites={removeFromFavorites}
                                isFavorite={isFavorite}
                               
                            />
                        ))}
                    </div>
                )}

            </div>
        </>
    );
}