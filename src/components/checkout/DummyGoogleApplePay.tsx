import gpay from "../../assets/google-pay.png"
import apay from "../../assets/apple-pay.png"
import { useTransaction } from "../../hooks/useTransaction"
import { useState } from "react"

const DummyGoogleApplePay = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { createTransaction } = useTransaction()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setPaymentStatus("Processing...")

    setTimeout(() => {
      createTransaction()
      setPaymentStatus("Payment successful")
      setIsModalOpen(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-1" onSubmit={handleSubmit}>
      <img
        src={gpay}
        onClick={() => setIsModalOpen(true)}
        className="w-40 h-10 object-contain border border-zinc-400 rounded-md cursor-pointer"
      />
      <img
        src={apay}
        onClick={() => setIsModalOpen(true)}
        className="w-40 h-10 object-contain border border-zinc-400 rounded-md cursor-pointer"
      />

      {/* <div className="flex justify-center w-full">
        <button
          type="submit"
          className="border border-zinc-300 text-center p-3 mt-6 bg-accent hover:bg-dark rounded-md duration-200 ease-in w-1/3 font-bold font-lg"
        >
          Pay Now
        </button>
      </div> */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Payment</h2>
            
            {paymentStatus && (
              <div>
                <p>{paymentStatus}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="border border-zinc-300 text-center p-3 mt-3 bg-accent hover:bg-dark rounded-md duration-200 ease-in w-full font-bold"
            >
              Pay Now
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="border border-zinc-300 text-center p-3 mt-3 bg-gray-300 hover:bg-gray-400 rounded-md duration-200 ease-in w-full font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DummyGoogleApplePay
