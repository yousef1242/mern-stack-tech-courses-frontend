import request from "@/ulits/request";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const PaypalButton = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { value, show, onHide, course, userInfo } = props;
  const initialOptions = {
    clientId:
      "AbI0WA6b5h9AhRpSTkx7zqWE_KARaam4WvsU-3UxixJphwlylXyuVedMKRAEtkI9mC1pMKaOr-LNlYCC",
    currency: "USD",
    intent: "capture",
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Subscribe in this course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: value,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(async (details) => {
                  toast.success("Thank you for subscribing to our course!");
                  try {
                    const { data } = await request.put(
                      `/api/courses/add-subscribe/${course?._id}`,
                      {},
                      {
                        headers: {
                          Authorization: "bearer " + user?.token,
                        },
                      }
                    );
                    course.userSubscribeIn = data.userSubscribeIn;
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const { data } = await request.put(
                      `/api/users/subscribe/${course?._id}`,
                      {},
                      {
                        headers: {
                          Authorization: "bearer " + user?.token,
                        },
                      }
                    );
                    userInfo.subscribeIn = data.subscribeIn;
                  } catch (error) {
                    console.log(error);
                  }
                });
              }}
            />
          </PayPalScriptProvider>
        ) : (
          <>
          <span>Please login</span>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaypalButton;
