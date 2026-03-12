import { useCollection, useFirestore } from 'vuefire'


import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    setDoc,
    updateDoc,
    query,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";
import moment from 'moment';

export const queryambilid = async (col: string) => {
    const db = useFirestore();
    const colRef = collection(db, col)

    const snapshot = await getDocs(colRef);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryambilidsesion = async (col: string) => {
    const datasesion = await getsesion(col);
    if (datasesion.length > 0) {
        return datasesion;
    }
    const db = useFirestore();
    const colRef = collection(db, col);
    const snapshot = await getDocs(colRef);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log14, datas)
    await setsesion(col, datas);
    return datas;
};

export const querynamagroup = async (id: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'm_group')
    const querybarangdata = query(colRef, where('id_group', '==', id))
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryneworder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'NEW'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querydeliveryorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'DELIVERY'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryditrimaorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'DITERIMA'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryrepackingorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'REPACKING'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};
export const querysmuorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'SMU'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querynoprinvorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'PR'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querysendinvoiceorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'SENDINVOICE'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querysendinvoiceorderbyidgroup = async (idgroup: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'SENDINVOICE'), where('id_group', '==', idgroup));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querynoinvoice = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'INVOICE'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querytarikdataorderbystatus = async (status: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', status));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querytarikdataorderbystatusnonreject = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '!=', 'DIREJECT'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)
    return datas;
};


export const querypaymentorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'PAYMENT'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryselesaiorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', 'SELESAI'));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryperusahaan = async (id: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'm_perusahaan')
    const querybarangdata = query(colRef, where('id_group', '==', id))
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryorderbygroup = async (tgl_awal: string, tgl_akhir: string, nama_group: string, status: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querybarangdata = query(colRef, where('dep_date', '>=', tgl_awal), where('dep_date', '<=', tgl_akhir), where('nama_group', '==', nama_group), where('status', '==', status))
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        // const id = doc.id;
        const data = doc.data();
        data.id = doc.id
        return { ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryreportops = async (tgl_awal: string, tgl_akhir: string, status: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    let querybarangdata
    querybarangdata = query(colRef, where('dep_date', '>=', tgl_awal), where('dep_date', '<=', tgl_akhir), where('status', '==', status))
    if (status == '') {
        querybarangdata = query(colRef, where('dep_date', '>=', tgl_awal), where('dep_date', '<=', tgl_akhir))
    }
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        // const id = doc.id;
        const data = doc.data();
        data.id = doc.id
        return { ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryorderbygroupbystatus = async (tgl_awal: string, tgl_akhir: string, nama_group: string, status: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    // console.log(tgl_awal, 'tgl_awal')
    // console.log(tgl_akhir, 'tgl_akhir')
    // console.log(nama_group, 'nama_group')
    let querybarangdata
    querybarangdata = query(colRef, where('dep_date', '>=', tgl_awal), where('dep_date', '<=', tgl_akhir), where('nama_group', '==', nama_group), where('status', '==', status))
    if (nama_group == "" && status == "") {
        querybarangdata = query(colRef, where('dep_date', '>=', tgl_awal), where('dep_date', '<=', tgl_akhir))
    }
    else if (nama_group == "" && status != '') {
        querybarangdata = query(colRef, where('dep_date', '>=', tgl_awal), where('dep_date', '<=', tgl_akhir), where('status', '==', status))
    }
    else if (nama_group != "" && status == '') {
        querybarangdata = query(colRef, where('dep_date', '>=', tgl_awal), where('dep_date', '<=', tgl_akhir), where('nama_group', '==', nama_group))
    }
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        // const id = doc.id;
        const data = doc.data();
        data.id = doc.id
        return { ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querydashboardorder = async () => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    // const tanggal_sekarang = moment()
    // const tanggal7minus = tanggal_sekarang.subtract(7,'days')
    // const tanggal_awal =  tanggal7minus.format('YYYY-MM-DD')

    // const querybarangdata = query(colRef, where('dep_date', '>=', tanggal_awal),orderBy("dep_date",'desc'))
    const querybarangdata = query(colRef)

    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        // const id = doc.id;
        const data = doc.data();
        data.id = doc.id
        return { ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const querydashboardorderbygroup = async (idgroup: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querybarangdata = query(colRef, where('id_group', '==', idgroup))
    // const querybarangdata = query(colRef)

    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        // const id = doc.id;
        const data = doc.data();
        data.id = doc.id
        return { ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
};

export const queryordervendoroutstanding = async (idvendor: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status_invoice_vendor', '==', 'Outstanding'), where('id_vendor', '==', idvendor));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
}

export const queryordervendorsubmit = async (idvendor: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status_invoice_vendor', '==', 'Submit'), where('id_vendor', '==', idvendor));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
}

export const queryorderbyvendorbystatus = async (idvendor: string, statusinvvendor: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status_invoice_vendor', '==', statusinvvendor), where('id_vendor', '==', idvendor));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
}

export const querynamaidbyclientbystatus = async (idgroup: string, status: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querydriver = query(colRef, where('status', '==', status), where('id_group', '==', idgroup));
    const snapshot = await getDocs(querydriver);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log(14, datas)

    return datas;
}


export const querypreorderbynamaperusahaan = async (email: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querybarangdata = query(colRef, where('nama_perusahaan', '==', email))
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log14, datas)

    return datas;
};



export const querypreorderbynamaperusahaanbystatus = async (email: string, status: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querybarangdata = query(colRef, where('nama_perusahaan', '==', email), where('status', '==', status))
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log14, datas)

    return datas;
};

export const querypreorderbynamavendor = async (email: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querybarangdata = query(colRef, where('nama_vendor', '==', email))
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log14, datas)

    return datas;
};

export const querypreorderbynamavendorbystatus = async (email: string, status: string) => {
    const db = useFirestore();
    const colRef = collection(db, 'order')
    const querybarangdata = query(colRef, where('nama_vendor', '==', email), where('status', '==', status))
    const snapshot = await getDocs(querybarangdata);
    const docs = Array.from(snapshot.docs).map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    const datas = await Promise.all(docs);
    // console.log14, datas)

    return datas;
};

export const queryspjbystatusarrayvendor = async (statusList: string[], vendor: string) => {
    const db = useFirestore()
    const colRef = collection(db, "order")

    const q = query(
        colRef,
        where("status", "in", statusList),
        where("nama_vendor", "==", vendor)
    )

    const snapshot = await getDocs(q)

    // Pastikan hanya yang sesuai yang masuk
    return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((item: any) => statusList.includes(item.status)) // ✅ Filter ekstra
}

