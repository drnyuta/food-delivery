import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { RootState } from "store/reducers/rootReducer";
import { fetchMenu } from "../../store/actions/asyncActions";
import { AppDispatch } from "store/reducers/rootReducer";
import { Button } from "../../components/Button/Button";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { MenuItem, Order } from "../../types/commonTypes";

import styles from "./MenuPage.styles.module.css";
import { addCartItemToDatabase } from "../../store/actions/asyncActions";

type MenuPageProps = {
  newCartValue: number;
  setNewCartValue: React.Dispatch<React.SetStateAction<number>>;
};

export const MenuPage = (props: MenuPageProps) => {
  const [showedProducts, setShowedProducts] = useState(6);
  const [category, setCategory] = useState<string | null>(null);
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);
  const menu = useSelector((state: RootState) => state.menu.menu);
  const isLoading = useSelector((state: RootState) => state.menu.isLoading);
  const displayFetchError = useSelector((state: RootState) => state.menu).error;
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { setNewCartValue } = props;

  const dispatch = useDispatch() as AppDispatch;
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleAddToCart = (inputValue: string, item: Order) => {
    const quantity = parseInt(inputValue);
    if (!quantity) {
      return;
    }
    setNewCartValue((prevState) => prevState + quantity);
    dispatch(addCartItemToDatabase({ ...item, quantity }, userId));
  };

  const handleSeeMore = () => {
    let remainingProducts;
    if (filteredMenu) {
      remainingProducts = filteredMenu.length - showedProducts;
    } else {
      remainingProducts = menu.length - showedProducts;
    }
    const nextItems = Math.min(6, remainingProducts);
    setShowedProducts(showedProducts + nextItems);
  };

  useEffect(() => {
    if (category) {
      setShowedProducts(6);
      const filteredMenu = menu.filter(
        (item: MenuItem) => item.category === category
      );
      setFilteredMenu(filteredMenu);
    } else {
      setFilteredMenu(menu);
    }
  }, [category, menu]);

  let showSeeMoreButton = menu.length > showedProducts;
  if (filteredMenu) {
    showSeeMoreButton = filteredMenu.length > showedProducts;
  }

  return (
    <>
      <main>
        <div className={styles.background}>
          <div className={styles.mainSection}>
            <h1 className={styles.title}>Browse our menu</h1>
            <p className={styles.description}>
              Use our menu to place an order online, or{" "}
              <span className={styles.tooltip}>
                phone
                <span className={styles.tooltiptext}>8 (555) 123-4567</span>
              </span>{" "}
              our store to place a pickup order. Fast and fresh food.
            </p>
            <div className={styles.buttonsWrapper}>
              <Button
                text="Dessert"
                type="primaryButton"
                active={category === "Dessert"}
                onClick={() => setCategory("Dessert")}
              />
              <Button
                text="Dinner"
                type="primaryButton"
                active={category === "Dinner"}
                onClick={() => setCategory("Dinner")}
              />
              <Button
                text="Breakfast"
                type="primaryButton"
                active={category === "Breakfast"}
                onClick={() => setCategory("Breakfast")}
              />
            </div>
            {isLoading && <p className={styles.loadingMessage}>Loading...</p>}
            {displayFetchError && (
              <p className={styles.errorMessage}>
                The server encountered an error and was unable to complete your
                request. Please try again later
              </p>
            )}
            <div
              className={styles.cards}
              style={{ display: displayFetchError ? "flex" : "grid" }}
            >
              {filteredMenu.slice(0, showedProducts).map((item: any) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.meal}
                  price={item.price}
                  image={item.img}
                  cardText={item.instructions}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
            {showSeeMoreButton && (
              <Button
                text="See more"
                type="secondaryButton"
                onClick={handleSeeMore}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
