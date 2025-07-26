import React, { useState } from "react";
import {
  X,
  Plus,
  Save,
  Cpu,
  MapPin,
  Settings,
  Wifi,
  Tag,
  Calendar,
  Building,
  User,
  AlertCircle,
} from "lucide-react";

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDevice: (device: NewDeviceData) => void;
}

interface NewDeviceData {
  name: string;
  type: string;
  location: string;
  ipAddress: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  firmware: string;
}

const deviceTypes = [
  "CNC Machining Center",
  "Automated Assembly",
  "Robotic Welding",
  "Inspection System",
  "Automated Packaging",
  "Conveyor System",
  "Quality Control",
  "Material Handler",
  "Industrial Robot",
  "Press Machine",
  "Laser Cutter",
  "Injection Molding",
  "Other",
];

const manufacturers = [
  "Fanuc",
  "ABB",
  "KUKA",
  "Siemens",
  "Bosch",
  "Cognex",
  "Mitsubishi",
  "Schneider Electric",
  "Rockwell Automation",
  "Yaskawa",
  "Other",
];

export function AddDeviceModal({
  isOpen,
  onClose,
  onAddDevice,
}: AddDeviceModalProps) {
  const [formData, setFormData] = useState<NewDeviceData>({
    name: "",
    type: "",
    location: "",
    ipAddress: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    firmware: "",
  });

  const [errors, setErrors] = useState<Partial<NewDeviceData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof NewDeviceData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<NewDeviceData> = {};

    if (!formData.name.trim()) newErrors.name = "Device name is required";
    if (!formData.type) newErrors.type = "Device type is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.ipAddress.trim()) {
      newErrors.ipAddress = "IP address is required";
    } else if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(formData.ipAddress)) {
      newErrors.ipAddress = "Please enter a valid IP address";
    }
    if (!formData.manufacturer)
      newErrors.manufacturer = "Manufacturer is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.serialNumber.trim())
      newErrors.serialNumber = "Serial number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      onAddDevice(formData);
      setIsSubmitting(false);
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      type: "",
      location: "",
      ipAddress: "",
      manufacturer: "",
      model: "",
      serialNumber: "",
      firmware: "",
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Add New Device
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure a new manufacturing device
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Device Name <span className="text-iot-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="e.g., CNC Machine A1"
                    className={`w-full px-3 py-2 bg-card border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                      errors.name
                        ? "border-iot-error focus:ring-iot-error/50"
                        : "border-border focus:ring-primary"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-xs text-iot-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Device Type <span className="text-iot-error">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => updateFormData("type", e.target.value)}
                    className={`w-full px-3 py-2 bg-card border rounded-lg text-foreground focus:outline-none focus:ring-2 transition-colors ${
                      errors.type
                        ? "border-iot-error focus:ring-iot-error/50"
                        : "border-border focus:ring-primary"
                    }`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select device type</option>
                    {deviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-xs text-iot-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.type}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Location <span className="text-iot-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    placeholder="e.g., Production Line A - Station 1"
                    className={`w-full px-3 py-2 bg-card border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                      errors.location
                        ? "border-iot-error focus:ring-iot-error/50"
                        : "border-border focus:ring-primary"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.location && (
                    <p className="text-xs text-iot-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    IP Address <span className="text-iot-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ipAddress}
                    onChange={(e) =>
                      updateFormData("ipAddress", e.target.value)
                    }
                    placeholder="e.g., 192.168.1.100"
                    className={`w-full px-3 py-2 bg-card border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                      errors.ipAddress
                        ? "border-iot-error focus:ring-iot-error/50"
                        : "border-border focus:ring-primary"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.ipAddress && (
                    <p className="text-xs text-iot-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.ipAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Device Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Device Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Manufacturer <span className="text-iot-error">*</span>
                  </label>
                  <select
                    value={formData.manufacturer}
                    onChange={(e) =>
                      updateFormData("manufacturer", e.target.value)
                    }
                    className={`w-full px-3 py-2 bg-card border rounded-lg text-foreground focus:outline-none focus:ring-2 transition-colors ${
                      errors.manufacturer
                        ? "border-iot-error focus:ring-iot-error/50"
                        : "border-border focus:ring-primary"
                    }`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select manufacturer</option>
                    {manufacturers.map((manufacturer) => (
                      <option key={manufacturer} value={manufacturer}>
                        {manufacturer}
                      </option>
                    ))}
                  </select>
                  {errors.manufacturer && (
                    <p className="text-xs text-iot-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.manufacturer}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Model <span className="text-iot-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => updateFormData("model", e.target.value)}
                    placeholder="e.g., R-2000iC/125L"
                    className={`w-full px-3 py-2 bg-card border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                      errors.model
                        ? "border-iot-error focus:ring-iot-error/50"
                        : "border-border focus:ring-primary"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.model && (
                    <p className="text-xs text-iot-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.model}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Serial Number <span className="text-iot-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) =>
                      updateFormData("serialNumber", e.target.value)
                    }
                    placeholder="e.g., CNC-2024-A007"
                    className={`w-full px-3 py-2 bg-card border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                      errors.serialNumber
                        ? "border-iot-error focus:ring-iot-error/50"
                        : "border-border focus:ring-primary"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.serialNumber && (
                    <p className="text-xs text-iot-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.serialNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Firmware Version
                  </label>
                  <input
                    type="text"
                    value={formData.firmware}
                    onChange={(e) => updateFormData("firmware", e.target.value)}
                    placeholder="e.g., v2.4.1"
                    className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Information Note */}
            <div className="p-4 bg-iot-blue-500/10 border border-iot-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-iot-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-iot-blue-500 mb-1">
                    Device Setup
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    After adding the device, it will appear with an "offline"
                    status until the first connection is established. Make sure
                    the device is properly configured to communicate with the
                    IoT platform.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                <span className="text-sm">Adding Device...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span className="text-sm">Add Device</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
