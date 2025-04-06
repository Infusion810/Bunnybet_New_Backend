// const papuModel = require('../models/papuModel');
// const titliWinnerModel = require('../models/TitliWinner');

// // Image list with amount and availability
// let images = [
//     { image: "butterfly.jpg", amount: 50, isAllowed: false },
//     { image: "cow.jpg", amount: 30, isAllowed: false },
//     { image: "football.jpg", amount: 20, isAllowed: false },
//     { image: "spin.jpg", amount: 25, isAllowed: false },
//     { image: "flower.webp", amount: 15, isAllowed: false },
//     { image: "diya.webp", amount: 40, isAllowed: false },
//     { image: "bucket.jpg", amount: 10, isAllowed: false },
//     { image: "kite.webp", amount: 35, isAllowed: false },
//     { image: "rat.webp", amount: 45, isAllowed: false },
//     { image: "umberlla.jpg", amount: 60, isAllowed: false },
//     { image: "parrot.webp", amount: 55, isAllowed: false },
//     { image: "sun.webp", amount: 70, isAllowed: false }
// ];

// // Function to get a random allowed image
// const getRandomAllowedImage = () => {
//     const allowedImages = images.filter(img => img.isAllowed);
//     // console.log(all)
//     if (allowedImages.length === 0) {
//         return null; // or handle the case when there are no allowed images
//     }
//     const randomIndex = Math.floor(Math.random() * allowedImages.length);
//     return allowedImages[randomIndex].image;
// };

// // API to update a random allowed image
// exports.updateRandomImage = async (req, res) => {
//     try {
//         const randomImage = getRandomAllowedImage();
//         if (!randomImage) {
//             return res.status(400).json({ message: "No allowed images available." });
//         }
//         // Save the randomly selected image to the database
//         const newEntry = await titliWinnerModel.create({ randomImage });

//         res.status(200).json({ message: "Random image updated successfully!", randomImage: newEntry.randomImage });

//     } catch (error) {
//         console.error("Error updating random image:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// // API to fetch the latest allowed random image
// exports.getRandomImage = async (req, res) => {
//     try {
//         // Fetch only documents that contain at least one allowed image
//         const allowedEntries = await titliWinnerModel.find({ "Images.isAllowed": true });

//         if (!allowedEntries.length) {
//             return res.status(404).json({ message: "No allowed images found in the database." });
//         }

//         // Flatten all allowed images into a single array
//         const allAllowedImages = allowedEntries.flatMap(entry =>
//             entry.Images.filter(img => img.isAllowed)
//         );

//         if (!allAllowedImages.length) {
//             return res.status(404).json({ message: "No allowed images found in the database." });
//         }

//         // Select a truly random image from the list
//         const randomImage = allAllowedImages[Math.floor(Math.random() * allAllowedImages.length)];

//         res.status(200).json({ randomImage: randomImage.image });

//     } catch (error) {
//         console.error("Error fetching random allowed image:", error);
//         res.status(500).json({ message: "Internal server error.", error: error.message });
//     }
// };



// // API to update the isAllowed status of an image
// exports.updateIsAllowed = async (req, res) => {
//     try {
//         const { image, isAllowed } = req.body;

//         console.log("Received request:", image, isAllowed);

//         if (!image) {
//             return res.status(400).json({ message: "Image URL is required." });
//         }

//         // 🔍 Debug: Check if the image exists before updating
//         const existingEntry = await titliWinnerModel.findOne({ "Images.image": image });

//         if (!existingEntry) {
//             console.log("❌ Image not found in database:", image);
//             return res.status(404).json({ message: "Image not found in database." });
//         }

//         // ✅ Update the isAllowed field
//         const updatedEntry = await titliWinnerModel.findOneAndUpdate(
//             { "Images.image": image },
//             { $set: { "Images.$.isAllowed": isAllowed } },
//             { new: true }
//         );

//         console.log("✅ Image updated successfully:", updatedEntry);

//         res.status(200).json({
//             message: "Image updated successfully!",
//             updatedImage: updatedEntry.Images.find(img => img.image === image)
//         });

//     } catch (error) {
//         console.error("❌ Error updating image:", error);
//         res.status(500).json({ message: "Internal server error.", error: error.message });
//     }
// };

// // API to fetch all saved random images
// // exports.getAllRandomImages = async (req, res) => {
// //     try {
// //         const data = await titliWinnerModel.find().sort({ createdAt: -1 });
// //         const playersdata= await papuModel.find()
// //         const bettingAmout = 0;
// //         playersdata.map((item)=>{
// //            selectedImage = item.selectedImage;
// //            console.log(selectedImage)
// //         })
// //         console.log(playersdata);
// //         console.log(data)
// //         if (data.length === 0) {
// //             const newEntry = new titliWinnerModel({ Images: images });
// //             await newEntry.save();
// //             data.push(newEntry);
// //         }
// //         res.status(200).json({ randomImages: data });
// //     } catch (error) {
// //         console.error("Error fetching random images:", error);
// //         res.status(500).json({ message: error.message });
// //     }
// // };


// exports.getAllRandomImages = async (req, res) => {
//     try {
//         const currentTime = new Date();
//         const fifteenSecondsAgo = new Date(currentTime.getTime() - 15000); // 15 seconds ago

//         const data = await titliWinnerModel.find().sort({ createdAt: -1 });
//         console.log(data)
//         if (data.length === 0) {
//             const newEntry = new titliWinnerModel({ Images: images });
//             await newEntry.save();
//             data.push(newEntry);
//         }
//         // Fetch only player data from the last 15 seconds
//         const playersdata = await papuModel.find({
//             createdAt: { $gte: fifteenSecondsAgo }
//         });

//         // Object to store the total bet amount for each image
//         const imageBetAmounts = {};

//         // Iterate over each player's selectedCard array
//         playersdata.forEach((player) => {
//             player.selectedCard.forEach((card) => {
//                 if (imageBetAmounts[card.image]) {
//                     imageBetAmounts[card.image] += card.betAmount;
//                 } else {
//                     imageBetAmounts[card.image] = card.betAmount;
//                 }
//             });
//         });

//         console.log("Total Bet Amount Per Image (Last 15 sec):", imageBetAmounts);

//         // Update the amounts in randomImages array
//         if (data.length > 0) {
//             data[0].Images.forEach((imageObj) => {

//                 // If an image has no bets in the last 15 seconds, set the amount to 0
//                 imageObj.amount = imageBetAmounts[imageObj.image] || 0;
//             });
//             // Sort images by bet amount in descending order (highest first)
//             data[0].Images.sort((a, b) => b.amount - a.amount);

//             // Save the updated data in the database
//             await data[0].save();
//         }

//         res.status(200).json({ randomImages: data, imageBetAmounts });
//     } catch (error) {
//         console.error("Error fetching random images:", error);
//         res.status(500).json({ message: error.message });
//     }
// };





// // API to get all images from the array
// exports.getAllImagesFromArray = (req, res) => {
//     try {
//         res.status(200).json({ images });
//     } catch (error) {
//         console.error("Error fetching images from array:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// // API to get a random allowed image from the array
// exports.getRandomAllowedImageFromArray = (req, res) => {
//     try {
//         // const randomImage = getRandomAllowedImage();
//         const allowedImages = images.filter(img => img.isAllowed);
//         console.log(allowedImages);
//         if (!allowedImages) {
//             return res.status(404).json({ message: "No allowed images available." });
//         }
//         res.status(200).json({ allowedImages });
//     } catch (error) {
//         console.error("Error fetching random allowed image:", error);
//         res.status(500).json({ message: error.message });
//     }
// };
const papuModel = require('../models/papuModel');
const titliWinnerModel = require('../models/TitliWinner');

// Image list with amount and availability
let images = [
    { image: "butterfly.jpg", amount: 50, isAllowed: false, imageNumber: 1 },
    { image: "cow.jpg", amount: 30, isAllowed: false, imageNumber: 2 },
    { image: "football.jpg", amount: 20, isAllowed: false, imageNumber: 3 },
    { image: "spin.jpg", amount: 25, isAllowed: false, imageNumber: 4 },
    { image: "flower.webp", amount: 15, isAllowed: false, imageNumber: 5 },
    { image: "diya.webp", amount: 40, isAllowed: false, imageNumber: 6 },
    { image: "bucket.jpg", amount: 10, isAllowed: false, imageNumber: 7 },
    { image: "kite.webp", amount: 35, isAllowed: false, imageNumber: 8 },
    { image: "rat.webp", amount: 45, isAllowed: false, imageNumber: 9 },
    { image: "umberlla.jpg", amount: 60, isAllowed: false, imageNumber: 10 },
    { image: "parrot.webp", amount: 55, isAllowed: false, imageNumber: 11 },
    { image: "sun.webp", amount: 70, isAllowed: false, imageNumber: 12 }
];

// Access the global titliGameState
let titliGameState;
try {
    // We'll access the titliGameState from the main server scope
    // This will be available once index.js initializes it
    titliGameState = global.titliGameState;
} catch (error) {
    console.error("Error accessing titliGameState:", error);
    // Create a default state if not accessible
    titliGameState = {
        currentRound: null,
        winningImage: null
    };
}

// API to update a random allowed image
exports.updateRandomImage = async (req, res) => {
    try {
        const allowedImages = images.filter(img => img.isAllowed);
        if (allowedImages.length === 0) {
            return res.status(400).json({ message: "No allowed images available." });
        }
        
        // We don't randomly select immediately - this is just for admin setting allowed images
        res.status(200).json({ 
            message: "Images updated successfully!", 
            allowedImages: allowedImages.map(img => img.image) 
        });

    } catch (error) {
        console.error("Error updating random image:", error);
        res.status(500).json({ message: error.message });
    }
};

// API to fetch the latest winning image - sync with game state
exports.getRandomImage = async (req, res) => {
    try {
        // If result phase has been reached, return the stored winning image
        if (titliGameState && titliGameState.gamePhase === 'result' && titliGameState.winningImage) {
            // Find the image number from the image list
            let winningImageNumber = titliGameState.winningImageNumber;
            
            // If not already in the gameState, try to find it
            if (!winningImageNumber) {
                const imageDetails = images.find(img => img.image === titliGameState.winningImage);
                winningImageNumber = imageDetails ? imageDetails.imageNumber : null;
            }
            
            return res.status(200).json({ 
                randomImage: titliGameState.winningImage,
                winningImageNumber: winningImageNumber,
                gamePhase: titliGameState.gamePhase,
                timeRemaining: titliGameState.timeRemaining,
                roundId: titliGameState.currentRound
            });
        }
        
        // If still in betting phase, don't reveal the result yet
        return res.status(200).json({ 
            message: "Game still in betting phase", 
            gamePhase: titliGameState ? titliGameState.gamePhase : 'unknown',
            timeRemaining: titliGameState ? titliGameState.timeRemaining : 0,
            roundId: titliGameState ? titliGameState.currentRound : null
        });

    } catch (error) {
        console.error("Error fetching random image:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

// API to update the isAllowed status of an image - only for admin
exports.updateIsAllowed = async (req, res) => {
    try {
        const { image, isAllowed } = req.body;

        console.log("Received request:", image, isAllowed);

        if (!image) {
            return res.status(400).json({ message: "Image URL is required." });
        }

        // Find the image in local array and update it
        const imageIndex = images.findIndex(img => img.image === image);
        if (imageIndex === -1) {
            return res.status(404).json({ message: "Image not found." });
        }

        // Update the isAllowed field
        images[imageIndex].isAllowed = isAllowed;

        // Save to database as well
        const existingEntry = await titliWinnerModel.findOne();
        
        if (!existingEntry) {
            // Create a new entry if none exists
            const newEntry = new titliWinnerModel({ Images: images });
            await newEntry.save();
        } else {
            // Update the existing entry
            const imageToUpdate = existingEntry.Images.findIndex(img => img.image === image);
            if (imageToUpdate !== -1) {
                existingEntry.Images[imageToUpdate].isAllowed = isAllowed;
                await existingEntry.save();
            }
        }

        res.status(200).json({
            message: "Image updated successfully!",
            updatedImage: { image, isAllowed }
        });

    } catch (error) {
        console.error("Error updating image:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

// API to fetch all images with their allowed status - for admin panel
exports.getAllRandomImages = async (req, res) => {
    try {
        const data = await titliWinnerModel.find().sort({ createdAt: -1 });
        
        // If no data, create initial entry
        if (data.length === 0) {
            const newEntry = new titliWinnerModel({ Images: images });
            await newEntry.save();
            data.push(newEntry);
        }
        
        // Get betting amounts from the latest games
        const currentTime = new Date();
        const fifteenSecondsAgo = new Date(currentTime.getTime() - 15000);
        
        const playersdata = await papuModel.find({
            createdAt: { $gte: fifteenSecondsAgo }
        });

        // Calculate total bet amount per image
        const imageBetAmounts = {};
        playersdata.forEach((player) => {
            player.selectedCard.forEach((card) => {
                if (imageBetAmounts[card.image]) {
                    imageBetAmounts[card.image] += card.betAmount;
                } else {
                    imageBetAmounts[card.image] = card.betAmount;
                }
            });
        });

        // Update amounts in our local array and database
        if (data.length > 0) {
            data[0].Images.forEach((imageObj) => {
                imageObj.amount = imageBetAmounts[imageObj.image] || 0;
                
                // Also update our local array
                const localIndex = images.findIndex(img => img.image === imageObj.image);
                if (localIndex !== -1) {
                    images[localIndex].amount = imageObj.amount;
                    images[localIndex].isAllowed = imageObj.isAllowed;
                }
            });
            
            // Sort by bet amount
            data[0].Images.sort((a, b) => b.amount - a.amount);
            await data[0].save();
        }

        res.status(200).json({ 
            randomImages: data, 
            imageBetAmounts,
            gameState: {
                roundId: titliGameState ? titliGameState.currentRound : null,
                gamePhase: titliGameState ? titliGameState.gamePhase : null,
                timeRemaining: titliGameState ? titliGameState.timeRemaining : null
            }
        });
    } catch (error) {
        console.error("Error fetching random images:", error);
        res.status(500).json({ message: error.message });
    }
};

// API to get all images from the array - for frontend initialization
exports.getAllImagesFromArray = (req, res) => {
    try {
        res.status(200).json({ 
            images,
            gameState: {
                roundId: titliGameState ? titliGameState.currentRound : null,
                gamePhase: titliGameState ? titliGameState.gamePhase : null,
                timeRemaining: titliGameState ? titliGameState.timeRemaining : null,
                bettingOpen: titliGameState ? titliGameState.bettingOpen : false
            }
        });
    } catch (error) {
        console.error("Error fetching images from array:", error);
        res.status(500).json({ message: error.message });
    }
};

// API to get only allowed images - for betting
exports.getRandomAllowedImageFromArray = (req, res) => {
    try {
        const allowedImages = images.filter(img => img.isAllowed);
        if (allowedImages.length === 0) {
            return res.status(404).json({ message: "No allowed images available." });
        }
        res.status(200).json({ 
            allowedImages,
            gameState: {
                roundId: titliGameState ? titliGameState.currentRound : null,
                gamePhase: titliGameState ? titliGameState.gamePhase : null,
                timeRemaining: titliGameState ? titliGameState.timeRemaining : null,
                bettingOpen: titliGameState ? titliGameState.bettingOpen : false
            }
        });
    } catch (error) {
        console.error("Error fetching random allowed image:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get current game state
exports.getCurrentGameState = (req, res) => {
    try {
        if (!titliGameState) {
            return res.status(404).json({ message: "Game state not initialized" });
        }
        
        res.status(200).json({
            gameState: {
                roundId: titliGameState.currentRound,
                gamePhase: titliGameState.gamePhase,
                timeRemaining: titliGameState.timeRemaining,
                bettingOpen: titliGameState.bettingOpen,
                winningImage: titliGameState.gamePhase === 'result' ? titliGameState.winningImage : null,
                winningImageNumber: titliGameState.gamePhase === 'result' ? titliGameState.winningImageNumber : null
            }
        });
    } catch (error) {
        console.error("Error fetching game state:", error);
        res.status(500).json({ message: error.message });
    }
};

// Place a new bet
exports.placeNewBet = async (req, res) => {
    try {
        const { user, betAmount, selectedCard, totalBets, gameId } = req.body;
        console.log(`Placing new bet for user ${user} in game ${gameId}`);
        
        // Check if betting is still open for this round
        if (titliGameState && 
            (!titliGameState.bettingOpen || 
             titliGameState.currentRound !== gameId)) {
            return res.status(400).json({ 
                message: "Betting is closed for this round or round has ended",
                gameState: {
                    roundId: titliGameState.currentRound,
                    timeRemaining: titliGameState.timeRemaining,
                    bettingOpen: titliGameState.bettingOpen
                }
            });
        }
        
        // Deduct balance
        const User_Wallet = require('../models/Wallet.js');
        const userWallet = await User_Wallet.findOne({ userId: user });
        
        if (!userWallet || userWallet.balance < totalBets) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        
        userWallet.balance -= totalBets;
        await userWallet.save();
        
        // Create new bet
        const PappuModel = require('../models/papuModel');
        const newBet = new PappuModel({
            user,
            titliGameId: gameId, // Ensure this field matches the schema
            betAmount,
            selectedCard,
            totalBets,
            isCompleted: false,
            isWin: false
        });
        
        await newBet.save();
        console.log(`Successfully saved bet with ID ${newBet._id} for game ${gameId}`);
        
        res.status(200).json({ 
            message: "Bet placed successfully", 
            newBalance: userWallet.balance,
            bet: newBet,
            gameState: {
                roundId: titliGameState ? titliGameState.currentRound : null,
                timeRemaining: titliGameState ? titliGameState.timeRemaining : null,
                bettingOpen: titliGameState ? titliGameState.bettingOpen : null
            }
        });
    } catch (error) {
        console.error("Error placing bet:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update bet result after game round completes
exports.updateBetResult = async (req, res) => {
    try {
        const { gameId, user, profit, totalBets, isWin } = req.body;
        
        // Find the bet
        const PappuModel = require('../models/papuModel');
        const bet = await PappuModel.findOne({ gameId, user, isCompleted: false });
        
        if (!bet) {
            return res.status(404).json({ message: "Bet not found" });
        }
        
        // Update the bet
        bet.isCompleted = true;
        bet.profit = profit || 0;
        bet.isWin = isWin || false;
        await bet.save();
        
        // If win, add profit to user wallet
        if (isWin && profit > 0) {
            const User_Wallet = require('../models/Wallet.js');
            const userWallet = await User_Wallet.findOne({ userId: user });
            
            if (userWallet) {
                userWallet.balance += profit;
                await userWallet.save();
                
                return res.status(200).json({ 
                    message: "Bet updated successfully", 
                    newBalance: userWallet.balance,
                    win: isWin,
                    profit
                });
            }
        }
        
        res.status(200).json({ 
            message: "Bet updated successfully",
            win: isWin,
            profit: 0
        });
    } catch (error) {
        console.error("Error updating bet:", error);
        res.status(500).json({ message: error.message });
    }
};
