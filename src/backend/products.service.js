import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

const productCollectionRef = collection(db, "products");

class ProductService {
  getProduct() {
    return getDocs(productCollectionRef);
  }

  getProductDetails(id) {
    const productDoc = doc(productCollectionRef, id);
    return getDoc(productDoc);
  }
}

export default new ProductService();
