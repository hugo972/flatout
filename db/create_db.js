/*
1885d86c-e3bd-4afe-b7b5-00860e421568
cfe5459c-a21a-4e21-a29b-f16640a979e5
731aa603-6179-4b98-953d-89b1e539e81f
c8790adf-3c9c-495e-8ebb-b6edbc52aaec
78486c67-49c7-448c-af4b-705e186fefb4
277267a8-779e-46b8-8557-d77ba05fa1de
f8c4cd63-fe97-409f-83a4-4f87017e62a9
1726e3f9-0ad7-4578-bf20-ec95621fb83c
abd4002b-b57e-4bc1-85b9-bfc1723856f4
8e09b3b3-07d6-4b71-baed-8b6f0b9c4060
de4d880d-af7b-4ed1-8e83-f72469f58b5f
0fa66529-d36e-46c6-b7ba-3027d7039d7c
2c284b40-7fad-4b51-836c-559b22a1d5e7


db.getCollection("Drivers").insert({_id: "78d50ba6-b39e-4f89-9e7f-c6580f6d922c", name: "Moshe Sivan"})
db.getCollection("Drivers").find({})

db.getCollection("Cars").insert({
    _id: "509e6967-f164-47c6-8674-8df5982d990e",
    driverId: "78d50ba6-b39e-4f89-9e7f-c6580f6d922c",
    drivetrain: "Rwd",
    enginePlacement: "Rear",
    horsepower: 344,
    mods: ["SPL suspension arms", "OS Giken differential", "KW Competition Coilovers", "OS Giken racing clutch", "GT wing"],
    tires: {
        Brand: "Nankang CRS",
        Size: "295/35/18"
    },
    title: "Nissan 370z Nismo"
})

db.getCollection("Cars").find({})


db.getCollection("Tracks").insert({
    _id: "068229e5-2411-4261-af39-27959fa59e1e",
    name: "Motorcity"
})

db.getCollection("Tracks").insert({
    _id: "374cb456-a783-4e13-a38a-8cf2f03c90b2",
    name: "Arad Racing Track"
})

db.getCollection("Tracks").insert({
    _id: "1c69ce7e-2d91-4bf4-aafe-9878e12e1e31",
    name: "Pezael Circuit"
})

db.getCollection("Tracks").find({})


db.getCollection("TrackLayouts").insert({
    _id: "52245ebc-6e6e-4c84-8ddb-f9b62c8c7596",
    name: "Regular",
    imageId: "52245ebc-6e6e-4c84-8ddb-f9b62c8c7596",
    trackId: "068229e5-2411-4261-af39-27959fa59e1e"
})

db.getCollection("TrackLayouts").insert({
    _id: "0d261a11-a0ad-4813-a711-c27e8119e66e",
    name: "Reverse",
    imageId: "0d261a11-a0ad-4813-a711-c27e8119e66e",
    trackId: "068229e5-2411-4261-af39-27959fa59e1e"
})

db.getCollection("TrackLayouts").find({})

*/
