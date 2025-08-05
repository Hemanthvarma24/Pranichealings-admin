"use client"

import { useState } from "react"

// Define types for our form data
type AreaData = {
  beforeEnergyInnerAura1: string
  beforeEnergyInnerAura2: string
  afterEnergyInnerAura1: string
  afterEnergyInnerAura2: string
  beforeActivationNormalSize1: string
  beforeActivationNormalSize2: string
  afterActivationNormalSize1: string
  afterActivationNormalSize2: string
}

type FormDataType = {
  [key: string]: AreaData
}

export default function ChakraHealingForm() {
  // Define all chakra areas
  const majorChakras = [
    "Basic",
    "Sex",
    "Navel",
    "Meng Mein",
    "Front Spleen",
    "Back Spleen",
    "Front Solar Plexus",
    "Back Solar Plexus",
    "Front Heart",
    "Back Heart",
    "Throat",
    "Ajna",
    "Forehead",
    "Crown",
  ]

  const minorChakras = [
    "Back Head",
    "Left Temple",
    "Right Temple",
    "Left Jaw",
    "Right Jaw",
    "Secondary Throat",
    "Left Hand",
    "Right Hand",
    "Left Sole",
    "Right Sole",
    "Perineum",
  ]

  const minorChakrasOrgans = ["", "", "", ""]

  // Initialize form data
  const [formData, setFormData] = useState<FormDataType>(() => {
    const initialData: FormDataType = {}
    ;[...majorChakras, ...minorChakras, ...minorChakrasOrgans].forEach((area) => {
      if (area) {
        initialData[area] = {
          beforeEnergyInnerAura1: "",
          beforeEnergyInnerAura2: "",
          afterEnergyInnerAura1: "",
          afterEnergyInnerAura2: "",
          beforeActivationNormalSize1: "",
          beforeActivationNormalSize2: "",
          afterActivationNormalSize1: "",
          afterActivationNormalSize2: "",
        }
      }
    })
    return initialData
  })

  // Handle form field changes
  const handleFieldChange = (areaName: string, field: keyof AreaData, value: string) => {
    if (!areaName) return

    setFormData((prev) => ({
      ...prev,
      [areaName]: {
        ...prev[areaName],
        [field]: value,
      },
    }))
  }

  // Create a dropdown field component
  const DropdownField = ({ areaName, field, value }: { areaName: string; field: keyof AreaData; value: string }) => (
    <div className="relative w-full h-full">
      <select
        className="w-full h-full  cursor-pointer px-2 py-1 appearance-none"
        value={value}
        onChange={(e) => handleFieldChange(areaName, field, e.target.value)}
      >
        <option value=""></option>
        {Array.from({ length: 11 }, (_, i) => (
          <option key={i} value={i.toString()}>
            {i}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )

  return (
    <div className="bg-white p-4 max-w-7xl mx-auto">
      <div className="text-center mb-6 relative">
        <button
          className="absolute left-0 top-0 flex items-center text-purple-700 hover:text-purple-900"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-purple-700">SCANNING RESULTS - BEFORE & AFTER HEALING</h1>
      </div>

      {/* Main Table */}
      <div className="border border-gray-300">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-1/9 border-r border-b border-gray-300"></th>
              <th colSpan={4} className="w-4/9 text-center py-2 border-r border-b border-gray-300">
                <div className="text-lg font-semibold text-purple-700">Energy Level</div>
                <div className="text-sm">
                  <span className="text-red-600">C</span>ongested /<span className="text-red-600">D</span>epleted /
                  <span className="text-red-600">N</span>ormal
                </div>
              </th>
              <th colSpan={4} className="w-4/9 text-center py-2 border-b border-gray-300">
                <div className="text-lg font-semibold text-purple-700">Activation Level</div>
                <div className="text-sm">
                  <span className="text-red-600">U</span>nderactivated /<span className="text-red-600">O</span>
                  veractivated /<span className="text-red-600">N</span>ormal
                </div>
              </th>
            </tr>
            <tr>
              <th className="border-r border-b border-gray-300 p-2">
                <div className="text-xs text-left">
                  All measurements in
                  <br />
                  <em>inches</em>
                </div>
              </th>
              <th colSpan={2} className="w-2/9 text-center font-semibold py-2 border-r border-b border-gray-300">
                Before Healing
              </th>
              <th colSpan={2} className="w-2/9 text-center font-semibold py-2 border-r border-b border-gray-300">
                After Healing
              </th>
              <th colSpan={2} className="w-2/9 text-center font-semibold py-2 border-r border-b border-gray-300">
                Before Healing
              </th>
              <th colSpan={2} className="w-2/9 text-center font-semibold py-2 border-b border-gray-300">
                After Healing
              </th>
            </tr>
            <tr>
              <th className="border-r border-b border-gray-300"></th>
              <th className="text-center py-1 border-r border-b border-gray-300 text-sm">Inner Aura</th>
              <th className="text-center py-1 border-r border-b border-gray-300 text-sm">Inner Aura</th>
              <th className="text-center py-1 border-r border-b border-gray-300 text-sm">Inner Aura</th>
              <th className="text-center py-1 border-r border-b border-gray-300 text-sm">Inner Aura</th>
              <th className="text-center py-1 border-r border-b border-gray-300 text-sm">Normal Size</th>
              <th className="text-center py-1 border-r border-b border-gray-300 text-sm">Normal Size</th>
              <th className="text-center py-1 border-r border-b border-gray-300 text-sm">Normal Size</th>
              <th className="text-center py-1 border-b border-gray-300 text-sm">Normal Size</th>
            </tr>
          </thead>
          <tbody>
            {/* Major Chakras Section */}
            <tr>
              <td colSpan={9} className="bg-purple-100 text-left font-semibold py-1 border-b border-gray-300">
                <div className="relative">
                  <span>Major Chakras</span>
                </div>
              </td>
            </tr>
            {majorChakras.map((chakra, index) => (
              <tr key={`major-${index}`}>
                <td className="p-2 bg-white border-b border-r border-gray-300">{chakra}</td>
                {/* Before Energy - Inner Aura 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <DropdownField
                    areaName={chakra}
                    field="beforeEnergyInnerAura1"
                    value={formData[chakra]?.beforeEnergyInnerAura1 || ""}
                  />
                </td>
                {/* Before Energy - Inner Aura 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    value={formData[chakra]?.beforeEnergyInnerAura2 || ""}
                    onChange={(e) => handleFieldChange(chakra, "beforeEnergyInnerAura2", e.target.value)}
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* After Energy - Inner Aura 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <DropdownField
                    areaName={chakra}
                    field="afterEnergyInnerAura1"
                    value={formData[chakra]?.afterEnergyInnerAura1 || ""}
                  />
                </td>
                {/* After Energy - Inner Aura 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    value={formData[chakra]?.afterEnergyInnerAura2 || ""}
                    onChange={(e) => handleFieldChange(chakra, "afterEnergyInnerAura2", e.target.value)}
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* Before Activation - Normal Size 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <DropdownField
                    areaName={chakra}
                    field="beforeActivationNormalSize1"
                    value={formData[chakra]?.beforeActivationNormalSize1 || ""}
                  />
                </td>
                {/* Before Activation - Normal Size 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    value={formData[chakra]?.beforeActivationNormalSize2 || ""}
                    onChange={(e) => handleFieldChange(chakra, "beforeActivationNormalSize2", e.target.value)}
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* After Activation - Normal Size 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <DropdownField
                    areaName={chakra}
                    field="afterActivationNormalSize1"
                    value={formData[chakra]?.afterActivationNormalSize1 || ""}
                  />
                </td>
                {/* After Activation - Normal Size 2 - Text Area */}
                <td className="bg-white border-b border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    value={formData[chakra]?.afterActivationNormalSize2 || ""}
                    onChange={(e) => handleFieldChange(chakra, "afterActivationNormalSize2", e.target.value)}
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
              </tr>
            ))}

            {/* Minor Chakras Section */}
            <tr>
              <td colSpan={9} className="bg-purple-100 text-left font-semibold py-1 border-b border-gray-300">
                <div className="relative">
                  <span>Minor Chakras</span>
                </div>
              </td>
            </tr>
            {minorChakras.map((chakra, index) => (
              <tr key={`minor-${index}`}>
                <td className="p-2 bg-white border-b border-r border-gray-300">{chakra}</td>
                {/* Before Energy - Inner Aura 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <DropdownField
                    areaName={chakra}
                    field="beforeEnergyInnerAura1"
                    value={formData[chakra]?.beforeEnergyInnerAura1 || ""}
                  />
                </td>
                {/* Before Energy - Inner Aura 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    value={formData[chakra]?.beforeEnergyInnerAura2 || ""}
                    onChange={(e) => handleFieldChange(chakra, "beforeEnergyInnerAura2", e.target.value)}
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* After Energy - Inner Aura 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <DropdownField
                    areaName={chakra}
                    field="afterEnergyInnerAura1"
                    value={formData[chakra]?.afterEnergyInnerAura1 || ""}
                  />
                </td>
                {/* After Energy - Inner Aura 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    value={formData[chakra]?.afterEnergyInnerAura2 || ""}
                    onChange={(e) => handleFieldChange(chakra, "afterEnergyInnerAura2", e.target.value)}
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* Before Activation - Normal Size 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <DropdownField
                    areaName={chakra}
                    field="beforeActivationNormalSize1"
                    value={formData[chakra]?.beforeActivationNormalSize1 || ""}
                  />
                </td>
                {/* Before Activation - Normal Size 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    value={formData[chakra]?.beforeActivationNormalSize2 || ""}
                    onChange={(e) => handleFieldChange(chakra, "beforeActivationNormalSize2", e.target.value)}
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* After Activation - Normal Size 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <DropdownField
                    areaName={chakra}
                    field="afterActivationNormalSize1"
                    value={formData[chakra]?.afterActivationNormalSize1 || ""}
                  />
                </td>
                {/* After Activation - Normal Size 2 - Text Area */}
                <td className="bg-white border-b border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    value={formData[chakra]?.afterActivationNormalSize2 || ""}
                    onChange={(e) => handleFieldChange(chakra, "afterActivationNormalSize2", e.target.value)}
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
              </tr>
            ))}

            {/* Minor Chakras Organs Section */}
            <tr>
              <td colSpan={9} className="bg-purple-100 text-left font-semibold py-1 border-b border-gray-300">
                <div className="relative">
                  <span>Min. Chakras Organs</span>
                </div>
              </td>
            </tr>
            {minorChakrasOrgans.map((_, index) => (
              <tr key={`organ-${index}`}>
                <td className="p-2 bg-white border-b border-r border-gray-300">
                  <input type="text" className="w-full bg-white border-none" placeholder="Organ name" />
                </td>
                {/* Before Energy - Inner Aura 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <div className="relative w-full h-full">
                    <select className="w-full h-full bg-white cursor-pointer px-2 py-1 appearance-none">
                      <option value=""></option>
                      {Array.from({ length: 11 }, (_, i) => (
                        <option key={i} value={i.toString()}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </td>
                {/* Before Energy - Inner Aura 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* After Energy - Inner Aura 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <div className="relative w-full h-full">
                    <select className="w-full h-full bg-white cursor-pointer px-2 py-1 appearance-none">
                      <option value=""></option>
                      {Array.from({ length: 11 }, (_, i) => (
                        <option key={i} value={i.toString()}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </td>
                {/* After Energy - Inner Aura 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* Before Activation - Normal Size 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <div className="relative w-full h-full">
                    <select className="w-full h-full bg-white cursor-pointer px-2 py-1 appearance-none">
                      <option value=""></option>
                      {Array.from({ length: 11 }, (_, i) => (
                        <option key={i} value={i.toString()}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </td>
                {/* Before Activation - Normal Size 2 - Text Area */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
                {/* After Activation - Normal Size 1 - Dropdown */}
                <td className="bg-white border-b border-r border-gray-300 p-0">
                  <div className="relative w-full h-full">
                    <select className="w-full h-full bg-white cursor-pointer px-2 py-1 appearance-none">
                      <option value=""></option>
                      {Array.from({ length: 11 }, (_, i) => (
                        <option key={i} value={i.toString()}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </td>
                {/* After Activation - Normal Size 2 - Text Area */}
                <td className="bg-white border-b border-gray-300 p-0">
                  <textarea
                    className="w-full h-full bg-white px-2 py-1 resize-none"
                    style={{ minHeight: "30px", overflow: "hidden" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = `${target.scrollHeight}px`
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="mt-4 text-right">
        <button className="bg-purple-600 text-white px-4 py-2 rounded">Save Results</button>
      </div>

      <style jsx>{`
        .writing-vertical-lr {
          writing-mode: vertical-lr;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  )
}