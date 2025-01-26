import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import { db } from '@/firebase/firebase.jsx';

export async function listProducts() {
  try {
    // Variables
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    // Extract products data
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(productId) {
  try {
    // Variables
    const product = doc(db, 'products', productId);
    const productSnapshot = await getDoc(product);
    // Handle snapshot
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function listVariants(productId) {
  try {
    // Variables
    const variantsCollection = collection(
      db,
      'products',
      productId,
      'variants'
    );
    const variantsSnapshot = await getDocs(variantsCollection);
    // Extract variants data
    const variants = variantsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return variants;
  } catch (error) {
    console.error('Error listing variants:', error);
    throw error;
  }
}

export async function getVariant(productId, variantId) {
  try {
    // Variables
    const variant = doc(db, 'products', productId, 'variants', variantId);
    const variantSnapshot = await getDoc(variant);
    // Handle snapshot
    if (variantSnapshot.exists()) {
      return { id: variantSnapshot.id, ...variantSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching variant:', error);
    throw error;
  }
}

export async function listSizes(productId, variantId) {
  try {
    // Variables
    const sizesCollection = collection(
      db,
      'products',
      productId,
      'variants',
      variantId,
      'sizes'
    );
    const sizesSnapshot = await getDocs(sizesCollection);
    // Extract variants data
    const sizes = sizesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sizes;
  } catch (error) {
    console.error('Error listing sizes:', error);
    throw error;
  }
}

export async function getSize(productId, variantId, sizeId) {
  try {
    // Variables
    const size = doc(
      db,
      'products',
      productId,
      'variants',
      variantId,
      'sizes',
      sizeId
    );
    const sizeSnapshot = await getDoc(size);
    // Handle snapshot
    if (sizeSnapshot.exists()) {
      return { id: sizeSnapshot.id, ...sizeSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching size:', error);
    throw error;
  }
}
