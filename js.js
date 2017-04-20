var holders = function()
{
	var holder = [];
	
	this.add = function(input)
	{
		holder.push(input)
	};
	
	this.show = function()
	{
		return(holder)
	};
};

Transaktioner = new holders();

/*
var Account = function(id, owner)
{
	var id = id;
	var owner = owner;
	var balance = 10000;
	
	this.transfer = function(toId, amount)
	{
		//hvis findes id
		if(amount > 0 && balance >= amount)
		{
			balance = balance - amount
			Transaktioner.add({"from": id, "to": toId, "amount": amount})
		}
		else{throw("Error")}
	}
	this.getBalance = function()
	{
		return(balance)
	}
}
**/

//*************** Klassen konto ******************//

var Konto = function(id, saldo, ejer, rentefod)
{
	if(typeof(id) == "number", typeof(saldo) == "number", typeof(ejer) == "string")
	{
		// private attributer
		var that = {};
		
		var id = id;
		var saldo = saldo;
		var ejer = ejer;
		var rentefod = rentefod;


		// Offentlige properties
		Object.defineProperty
		(
			that, "saldo", 
			{
				"get": function()
				{
					return(saldo)
				}
				//"set": function() {}
			}
		);

        Object.defineProperty
        (
            that, "rente",
            {
                "get": function()
                {
                    return(rentefod)
                },
                "set": function(nyRente)
				{
					rentefod = nyRente;
				}
            }
        );

        Object.defineProperty
        (
            that, "id",
            {
                "get": function()
                {
                    return(id)
                }
                //"set": function() {}
            }
        );

        Object.defineProperty
        (
            that, "ejer",
            {
                "get": function()
                {
                    return(ejer)
                }
                //"set": function() {}
            }
        );

		that.udtraek = function (beloeb)
		{
			if (beloeb < 0)
			{
				throw ("Kontoen tillader ikke at udtrække et negativt beløb.")
			}

        	if (saldo - beloeb < 0)
			{
				throw("Kontoen tillader ikke at hæve mere en saldoen.")
			}
			else
			{
				saldo -= beloeb;
				// return beloeb // skal vi returnere noget ??? Beløbet eller den nye saldo
			}
        };

        that.indsaet = function(beloeb)
		{
            if (beloeb < 0)
            {
                throw ("Kontoen tillader ikke at indsætte et negativt beløb.")
            }

            saldo += beloeb;
		};

		that.validerUdtraek = function(beloeb)
		{
			return saldo - beloeb >= 0;
		};

		that.validerIndsaet = function()
		{
			return true; // på denne konto er det ALTID ok at indsætte penge.
		}
	}
	else{throw("Fejl i enten id'et eller saldo'en eller ejer")}
	
	return(that)
};

// global kontantKonto
var kontantKonto = Konto(0, 0, 'banken', 0);


//*************** Klassen TellerMachine ******************//

function TellerMachine(kontantKontoen)
{
    that = {};

    that.kontantKonto = kontantKontoen || kontantKonto || Konto(0, 0, 'banken', 0);; // hvor er den her?

    that.udfoerTransaktion = function(afsender, modtager, beloeb)
    {
        var transaktion = Transaktion(that, afsender, modtager, beloeb);
        if(transaktion.valider())
        {
            transaktion.udfoer();
        }
    };

    return that;
}

//*************** Klassen trans ******************//

function Transaktion(teller, afsender, modtager, beloeb)
{
    var that = {};

    if (teller == null || afsender == null || modtager == null || typeof(beloeb) != "number")
    {
        throw("Manglende eller forkerte parametre til Transaktion()");
    }
    else
    {
        that.teller = teller;
        that.afsender = afsender;
        that.modtager = modtager;
        that.beloeb = beloeb;

        that.tidsstempel = new Date();

        var succes;



        that.valider = function()
        {
            return afsender.validerUdtraek(that.beloeb)
                && modtager.validerIndsaet(that.beloeb);
        };

        that.udfoer = function()
        {
            if (that.valider())
            {
                afsender.udtraek(that.beloeb);
                try {
                    modtager.indsaet(that.beloeb);
                }
                catch(e) {
                    afsender.indsaet(that.beloeb); // rollback
                    succes = false;
                }
                succes = true;
            }
        };

        return that;
    }
}