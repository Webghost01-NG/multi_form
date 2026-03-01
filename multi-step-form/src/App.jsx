import { useState } from "react"
import "./App.css"

function App() {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Arcade",
    billing: "monthly",
    addons: []
  })

  const plans = {
    Arcade: { monthly: 9, yearly: 90 },
    Advanced: { monthly: 12, yearly: 120 },
    Pro: { monthly: 15, yearly: 150 }
  }

  const addonsList = [
    { name: "Online service", monthly: 1, yearly: 10 },
    { name: "Larger storage", monthly: 2, yearly: 20 },
    { name: "Customizable profile", monthly: 2, yearly: 20 }
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleAddon = (addon) => {
    if (formData.addons.includes(addon)) {
      setFormData({
        ...formData,
        addons: formData.addons.filter(a => a !== addon)
      })
    } else {
      setFormData({
        ...formData,
        addons: [...formData.addons, addon]
      })
    }
  }

  const nextStep = () => step < 5 && setStep(step + 1)
  const prevStep = () => step > 1 && setStep(step - 1)

  const total =
    plans[formData.plan][formData.billing] +
    formData.addons.reduce((acc, addon) => {
      const item = addonsList.find(a => a.name === addon)
      return acc + item[formData.billing]
    }, 0)

  return (
    <div className="container">
      <div className="card">

        {/* Sidebar */}
        <div className="sidebar">
          {[1,2,3,4].map(num => (
            <div key={num} className={`step ${step === num ? "active" : ""}`}>
              <span>{num}</span>
              <div>
                <p className="step-title">STEP {num}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="form-section">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h1>Personal Info</h1>
              <input name="name" placeholder="Name" onChange={handleChange} />
              <input name="email" placeholder="Email" onChange={handleChange} />
              <input name="phone" placeholder="Phone" onChange={handleChange} />
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h1>Select Plan</h1>

              <div className="plan-container">
                {Object.keys(plans).map(plan => (
                  <div
                    key={plan}
                    className={`plan-card ${formData.plan === plan ? "selected" : ""}`}
                    onClick={() => setFormData({ ...formData, plan })}
                  >
                    <h3>{plan}</h3>
                    <p>
                      ${plans[plan][formData.billing]}/
                      {formData.billing === "monthly" ? "mo" : "yr"}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    billing: formData.billing === "monthly" ? "yearly" : "monthly"
                  })
                }
              >
                Toggle Billing ({formData.billing})
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h1>Add-ons</h1>

              {addonsList.map(addon => (
                <div key={addon.name} className="addon">
                  <input
                    type="checkbox"
                    checked={formData.addons.includes(addon.name)}
                    onChange={() => toggleAddon(addon.name)}
                  />
                  <span>{addon.name}</span>
                  <span>
                    +${addon[formData.billing]}/
                    {formData.billing === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
              ))}
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <h1>Summary</h1>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Plan:</strong> {formData.plan} ({formData.billing})</p>
              <p><strong>Add-ons:</strong></p>
              {formData.addons.map(a => <p key={a}>• {a}</p>)}
              <h3>Total: ${total}/{formData.billing === "monthly" ? "mo" : "yr"}</h3>
            </>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <>
              <h1>Thank You!</h1>
              <p>Your subscription has been confirmed 🎉</p>
            </>
          )}

          <div className="button-group">
            {step > 1 && step < 5 && (
              <button onClick={prevStep}>Back</button>
            )}
            {step < 4 && (
              <button onClick={nextStep}>Next</button>
            )}
            {step === 4 && (
              <button onClick={nextStep}>Confirm</button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default App