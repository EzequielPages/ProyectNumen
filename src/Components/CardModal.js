import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./Card.css";
import MaterialUIPickers from "./CardDatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {CartContext} from "../reducer/cartContext"
import { useContext } from "react";
import {TYPES} from "../actions/shoppingActions"


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal(product) {
  const [ dispatch] = useContext(CartContext);
  
  const updateState = async () => {
    const PRODUCTS_URL = "http://localhost:5000/products",
      CART_URL= "http://localhost:5000/cart";

    const resProducts = await fetch(PRODUCTS_URL),
      resCart = await fetch(CART_URL);

    const productsList = await resProducts.json(),
      cartItems = await resCart.json();

    dispatch({type: TYPES.READ_STATE, payload: [productsList, cartItems] });
  }
  
  

  const addToCart = async (product) => {

    const PRODUCT = product.product

    PRODUCT.id = Date.now()

    PRODUCT["quantity"] = 1

    const options = {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(PRODUCT)  
    }
  

    await fetch("http://localhost:5000/cart", options)

    updateState()

  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="success"
        className="italic"
        onClick={handleOpen}>
        Agregar al carrito
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box className="text-center" sx={{ ...style, width: 200 }}>
          <p className="mb-2 text-center italic">
            ¿Está seguro que desea agregar esto al carrito?
          </p>
          <Button className="mb-2 italic" onClick={() => addToCart(product)}>
            AGREGAR
          </Button>
          <Button color="error" className="mb-2 italic" onClick={handleClose}>
            CERRAR
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({ destino, product}) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-center">
      <button variant="outlined" className="w-64 h-12 btn btn-primary text-sm font-medium"
        onClick={handleOpen}>
        Seleccionar Fecha
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box className="modalSize" sx={{ ...style, width: 600 }}>
          <div className="flex justify-between">
            <h2 id="parent-modal-title" className="italic">
              Tu viaje a {destino}
            </h2>            
            <button>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-error"
                onClick={handleClose}
              />
            </button>
          </div>
          <p id="parent-modal-description" className="mb-5">
            Selecciona la fecha ideal para tu viaje
          </p>
          <MaterialUIPickers></MaterialUIPickers>
          <div className="text-center mt-12">
            <ChildModal product={product} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
