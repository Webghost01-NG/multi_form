import { useState } from "react"
import "./App.css"

function App() {
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")
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
    {
      name: "Online service",
      description: "Access to multiplayer games",
      monthly: 1,
      yearly: 10
    },
    {
      name: "Larger storage",
      description: "Extra 1TB of cloud save",
      monthly: 2,
      yearly: 20
    },
    {
      name: "Customizable profile",
      description: "Custom theme on your profile",
      monthly: 2,
      yearly: 20
    }
  ]

  const validateStepOne = () => {
    if (!formData.name  !formData.email  !formData.phone) {
      setError("All fields are required")
      return false
    }
    const emailPattern = /\S+@\S+\.\S+/
    if (!emailPattern.test(formData.email)) {
      setError("Enter a valid email")
      return false
    }
    setError("")
    return true
  }

  const toggleAddon = (addonName) => {
    if (formData.addons.includes(addonName)) {
      setFormData({
        ...formData,
        addons: formData.addons.filter(a => a !== addonName)
      })
    } else {
      setFormData({
        ...formData,
        addons: [...formData.addons, addonName]
      })
    }
  }

  const nextStep = () => {
    if (step === 1 && !validateStepOne()) return
    setStep(prev => prev + 1)
  }

  const prevStep = () => setStep(prev => prev - 1)

  const total =
    plans[formData.plan][formData.billing] +
    formData.addons.reduce((acc, addon) => {
      const item = addonsList.find(a => a.name === addon)
      return acc + item[formData.billing]
    }, 0)

  return (
    <div className="container">
      <div className="card">

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
          <div className="step-content">

            {step === 1 && (
              <>
                <h1>Personal Info</h1>
                {error && <p className="error">{error}</p>}
                <input
                  placeholder="Name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </>
            )}

            {step === 2 && (
              <>
                <h1>Select Your Plan</h1>
                <div className="plan-container">
                  {Object.keys(plans).map(plan => (
                    <div
                      key={plan}
                      className={`plan-card ${formData.plan === plan ? "selected" : ""}`}
                      onClick={() => setFormData({...formData, plan})}
                    >
                      <h3>{plan}</h3>
                      <p>
                        ${plans[plan][formData.billing]}/
                        {formData.billing === "monthly" ? "mo" : "yr"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h1>Pick add-ons</h1>

                {addonsList.map(addon => (
                  <divkey={addon.name}
                    className={`addon-card ${
                      formData.addons.includes(addon.name) ? "selected" : ""
                    }`}
                    onClick={() => toggleAddon(addon.name)}
                  >
                    <div>
                      <h4>{addon.name}</h4>
                      <p>{addon.description}</p>
                    </div>

                    <span>
                      +${addon[formData.billing]}/
                      {formData.billing === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                ))}
              </>
            )}

            {step === 4 && (
              <>
                <h1>Summary</h1>

                <div className="summary-box">
                  <p>
                    {formData.plan} ({formData.billing})
                  </p>

                  {formData.addons.map(addon => (
                    <p key={addon} className="summary-addon">
                      {addon}
                    </p>
                  ))}
                </div>

                <h3>
                  Total: ${total}/
                  {formData.billing === "monthly" ? "mo" : "yr"}
                </h3>
              </>
            )}

          </div>

          <div className="button-group">
            {step > 1 && <button onClick={prevStep}>Go Back</button>}
            {step < 4 && <button onClick={nextStep}>Next</button>}
            {step === 4 && <button>Confirm</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App