import cron from "node-cron";
import Slot from "../models/slot.js";

const unlockSlots = async () => {
    try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const res = await Slot.updateMany(
            {
                locked: true,
                lockedAt: { $lte: fiveMinutesAgo}
            },
            {
                $set: { locked: false, lockedAt: null }
            }
        );

        if (res.modifiedCount > 0) {
            console.log('Slots unlocked');
        }

    } catch (error) {
        console.error(error.message);
    }
};

export const startSlotsUnlockCron = () => {
    cron.schedule("* * * * *", async () => {
        await unlockSlots();
        console.log("Unlock slots cron running")
    });
}