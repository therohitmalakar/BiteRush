import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AddItem({ onClose, isOpen }) {
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    // image:null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFoodData({ ...foodData, image: files[0] });
    } else {
      setFoodData({ ...foodData, [name]: value });
    }
  };

  

  const handleSubmit = async (e) => {
    console.log("Submitting form:", foodData);

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("category", foodData.category);
    formData.append("price", foodData.price);
    formData.append("image", foodData.image);

    console.log(formData, foodData);

    try {
      const res = await fetch("http://localhost:8080/user/addItem", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Item added successfully");
        onClose();
        setFoodData({
          name: "",
          description: "",
          category: "",
          price: "",
          image: null,
        });
      } else {
        alert(data.message || "Failed to add item.");
      }
    } catch (error) {
      console.error("AddItem Error", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-black ">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>
            Use this form to enter new food items to your menu. Ensure all
            details are accurate before saving.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                value={foodData.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="descriptiom">Description</Label>
              <Input
                id="descriptiom"
                name="description"
                value={foodData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3 ">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={foodData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
               text-foreground shadow-sm transition-colors
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
               focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option className="bg-[#221A14] text-white" value="">
                  Select...
                </option>
                <option className="bg-[#221A14] text-white"  value="burgers">
                  Burgers
                </option>
                <option className="bg-[#221A14] text-white"  value="pizza">
                  Pizza
                </option>
                <option className="bg-[#221A14] text-white"  value="pasta">
                  Pasta
                </option>
                <option className="bg-[#221A14] text-white"  value="snacks">
                  Snacks
                </option>
                <option className="bg-[#221A14] text-white"  value="meal">
                  Meal
                </option>
                <option className="bg-[#221A14] text-white"  value="drinks">
                  Drinks
                </option>
                <option className="bg-[#221A14] text-white"  value="desserts">
                  Desserts
                </option>
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price in Rs.</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={foodData.price}
                onChange={handleChange}
              />
            </div>
            {
              <div className="grid gap-3">
                <Label htmlFor="image">Add Image</Label>
                <Input
                  key={foodData.image ? foodData.image.name : "empty"}
                  type="file"
                  id="image"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                />
              </div>
            }
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button className=" bg-[#ff9d00] hover:bg-[#f5b802] " type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddItem;
